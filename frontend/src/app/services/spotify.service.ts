import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { response } from 'express';
import { randomInt } from 'node:crypto';
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
      .set('market', "SE")
    

    return this.http.get<any>(url, {headers, params});
  }

  searchTracks(categories: string[], year: string | undefined, size: number, token: string){
    const url = "https://api.spotify.com/v1/search"
    //const offset = randomInt(0, 999);
    const offset = 0;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const params = new HttpParams()
      .set('type', 'track') 
      .set('limit', size)
      .set('market', "SE")
      .set('offset', offset)
      .set('q', `year:${year} genre:${categories.join(' ')}`)

    return this.http.get<any>(url, { headers, params });
  }
    
  

  
  
}
