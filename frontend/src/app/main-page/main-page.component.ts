import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {

  constructor() {}
  clientId = '7339ca643f984a34832f0fd8b6944a7d';
  redirectUri = 'http://localhost:4001/callback';
  scopes = "streaming user-read-email user-modify-playback-state user-read-playback-state user-read-currently-playing user-read-private"

  connectToSpotify(){
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${this.clientId}&response_type=token&scope=${encodeURIComponent(this.scopes)}&redirect_uri=${encodeURIComponent(this.redirectUri)}`;
    window.location.href = authUrl;
  }
}
