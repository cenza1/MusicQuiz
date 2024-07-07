import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { response } from 'express';
@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http: HttpClient) { }
  
  getTracks(categories: string[], size: number, token: string){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    let trackResults = []
    const url = "https://api.spotify.com/v1/recommendations";
    console.log(categories);
    const params = new HttpParams()
      .set('seed_genres', categories.join(',')) 
      .set('limit', size)
    

    return this.http.get<any>(url, {headers, params});
  }

  placeInQueue(playlistUris: string[], deviceId: string, token: string){
    const queryUri = "https://api.spotify.com/v1/me/player/queue";
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    console.log("playlistUri and id", playlistUris, deviceId);
    playlistUris.forEach(uri => {
      const params = new HttpParams()
      .set('uri', uri)
      .set('device_id', deviceId)

      this.http.post(queryUri, null, {params, headers}).subscribe(response => {
        console.log(`Track ${uri} added to queue`, response)
      }, error => {
        console.error(`Error adding track ${uri} to queue:`, error);
      }
    );
      });
    
  }
  
}
