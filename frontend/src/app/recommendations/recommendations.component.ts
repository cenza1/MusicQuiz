import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SpotifyService } from '../services/spotify.service';
import { start } from 'repl';

@Component({
  selector: 'app-recommendations',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recommendations.component.html',
  styleUrl: './recommendations.component.css'
})
export class RecommendationsComponent implements OnInit{
  recommendedTracks: any
  aToken: any
  skipToPlayer: boolean = false;
  size: number = 0
  
  constructor(private router: Router, private spotifyService: SpotifyService) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.recommendedTracks = navigation.extras.state['recommendations'];
      this.aToken = navigation.extras.state['token'];
      this.skipToPlayer = navigation.extras.state['skipToPlayer'];

    }
  }
  ngOnInit(): void {
    this.size = this.recommendedTracks.tracks.length;
    console.log(this.recommendedTracks);
    if(this.skipToPlayer){
      this.startQuiz();
    }
  }

  replaceSong(trackName: string){
    console.log(trackName);
    console.log(this.recommendedTracks.tracks)
    this.recommendedTracks.tracks = this.recommendedTracks.tracks.filter((song: any) => song.name !== trackName);
    console.log(this.recommendedTracks.tracks);
  }
  generateNewQuiz(){
    if(this.recommendedTracks.tracks.length < this.size){
      const limit = this.size - this.recommendedTracks.tracks.length;
      let categories: string[] = [];
      this.recommendedTracks.seeds.forEach((element: any) => {
        console.log(element);
        categories.push(element.id);
      });
      console.log(categories)
      this.spotifyService.getTracks(categories, limit, this.aToken)
      .subscribe(
        data => {
          const newTracks = data.tracks;
          this.recommendedTracks.tracks.push(... newTracks);
          console.log("New tracks", newTracks);
          console.log(this.recommendedTracks);
        },
        error => {
          console.log("Could not get tracks", error);
        }
      )



     
    }
  }
  startQuiz(){
    this.router.navigate(['/quiz-player'], { state:  {token: this.aToken, playlist: this.recommendedTracks, noHost: this.skipToPlayer }});
  }
}
