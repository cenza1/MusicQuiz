import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SpotifyService } from '../services/spotify.service';
import { ChangeDetectorRef } from '@angular/core';
declare global {
  interface Window { Spotify: any; onSpotifyWebPlaybackSDKReady: () => void;}
}

@Component({
  selector: 'app-quiz-player',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quiz-player.component.html',
  styleUrl: './quiz-player.component.css'
})
export class QuizPlayerComponent implements OnInit{
  player: any;
  token: any;
  playlist: any;
  deviceId: any;
  trackUris: string[] = [];
  isPlaying = false;
  currentTrack: any;
  isInitialized = false;
  trackCount: number = 1;
  noHost: boolean = false;
  showResults: boolean = false;
  
  constructor(private router: Router, private spotifyService: SpotifyService, private cdr: ChangeDetectorRef){
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.token = navigation.extras.state['token'];
      this.playlist = navigation.extras.state['playlist']
      this.noHost = navigation.extras.state['noHost']

      
    }
  }

  ngOnInit(): void {
    for(let i = 0; i < this.playlist.tracks.length; i++){
      this.trackUris.push(this.playlist.tracks[i].uri);

    }
    
    this.initSpotifyPlayer();
    console.log(this.noHost);
  }

  initSpotifyPlayer(){
    window.onSpotifyWebPlaybackSDKReady = () => {
      this.player = new window.Spotify.Player({
        name: 'Web Playback SDK Quick Start Player',
        getOAuthToken: (cb: any) => {cb(this.token); },
        volume: 0.5
      });
    
    this.player.addListener('initialization_error', ({ message }: any) => { console.error(message); });
    this.player.addListener('authentication_error', ({ message }: any) => { console.error(message); });
    this.player.addListener('account_error', ({ message }: any) => { console.error(message); });
    this.player.addListener('playback_error', ({ message }: any) => { console.error(message); });

    this.player.addListener('player_state_changed', (state: any) => { 
      if(state){
        console.log("In state change")
        
        this.currentTrack = state.track_window.current_track;
        this.isPlaying = !state.paused;
        this.cdr.detectChanges();
      }
      

      });
    
    this.player.addListener('ready', ({ device_id }: any) => {
      console.log('Ready with Device ID', device_id);
      console.log('thisID', this.deviceId);
      this.transferPlaybackHere(device_id);
      this.playTracks(this.trackUris, device_id);
      
    });

    
    

    // Not Ready
    this.player.addListener('not_ready', ({ device_id }: any) => {
      console.log('Device ID has gone offline', device_id);
    });

    
    this.player.connect();
    this.player.pause();
    
    
    };
    const script = document.createElement('script');
    script.src = 'https://sdk.scdn.co/spotify-player.js';
    script.async = true;
    document.body.appendChild(script);
   
    
  }

  transferPlaybackHere(deviceId: string): void {
   
    fetch('https://api.spotify.com/v1/me/player', {
      method: 'PUT',
      body: JSON.stringify({
        "device_ids": [deviceId],
        "play": true
      }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      },
    });
  }

  playTracks(trackUris: string[], device_id: string): void {
    console.log(trackUris);
    console.log("Device Id", this.deviceId);
    fetch(`https://api.spotify.com/v1/me/player/play?device_id=${device_id}`, {
      method: 'PUT',
      body: JSON.stringify({ uris: trackUris }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      },
    }).then(response => {
      if (response.ok) {
        console.log('Tracks are playing!');
      } else {
        console.error('Failed to play tracks:', response.statusText);
      }
    }).catch(error => console.error('Error:', error));

    
  }
  togglePlayPause(): void {
    this.isPlaying ? this.player.pause() : this.player.resume();
    this.isPlaying = !this.isPlaying;
    
    
  }
  toggleShowResults(): void{
    this.showResults = true;
  }

  nextTrack(): void {
    this.player.nextTrack().then(() => {
      setTimeout(()=> {
        console.log("Skipped to next track!")
        this.trackCount++;
        this.showResults = false;
      }, 100);
    });
  }

  previousTrack(): void {
    this.player.previousTrack();
    this.trackCount--;
    
  }

}
