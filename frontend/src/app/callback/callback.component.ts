import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { spotifyCategories } from '../entities/categories';
import { CommonModule } from '@angular/common';
import { SpotifyService } from '../services/spotify.service';
import { Router } from '@angular/router';
import { getDecades } from '../entities/decades';

@Component({
  selector: 'app-callback',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './callback.component.html',
  styleUrl: './callback.component.css'
})
export class CallbackComponent implements OnInit {
  
  accessToken: string | null = null;
  categories = spotifyCategories;
  selectedCategories : string[] = []
  quizSize = [10, 20, 30, 40];
  selectedQuizSize : number = 0
  recommendedTracks: any
  decades = getDecades();
  selectedDecade: string | undefined
  constructor(private route: ActivatedRoute, private spotifyService: SpotifyService, private router: Router,) {}

  ngOnInit() {
    this.route.fragment.subscribe((fragment: string | null) => {
      if (fragment) {
        const accessTokenMatch = fragment.match(/access_token=([^&]+)/);
        this.accessToken = accessTokenMatch ? accessTokenMatch[1] : null;
      }
      console.log(this.accessToken);
    });
    console.log(this.categories);
  }
  toggleCategorySelection(chosenCategory: string){
    if(!spotifyCategories[chosenCategory]){
      this.categories[chosenCategory] = true;
      this.selectedCategories.push(chosenCategory);
    }
    else{
      spotifyCategories[chosenCategory] = false;
      this.selectedCategories = this.selectedCategories.filter(category => category !== chosenCategory);
    }
    console.log(this.selectedCategories);
  }
  
  toggleSelectSize(size: number){
    if(size !== this.selectedQuizSize){
      this.selectedQuizSize = size;
    }
    else{
      this.selectedQuizSize = 0;
    }
  }
  toggleSelectYear(decade: string){
    if(decade !== this.selectedDecade){
      this.selectedDecade = decade;
    }
    else{
      this.selectedDecade = undefined;
    }
  }
  isSelected(size: any): boolean {

    return this.selectedQuizSize === size;
  }
  isYearSelected(year: string): boolean{
    return this.selectedDecade === year
  }
  getCategories(){
     this.spotifyService.getTracks(this.selectedCategories, this.selectedQuizSize, this.accessToken!)
     .subscribe(
       data => {
         this.recommendedTracks = data;
         this.router.navigate(['/recommendations'], { state: { recommendations: this.recommendedTracks, token: this.accessToken } });
         console.log(this.recommendedTracks);
         
       },
       error => {
         console.log("Could not get tracks", error);
       }
     )
    // this.spotifyService.searchTracks(this.selectedCategories, this.selectedDecade, this.selectedQuizSize, this.accessToken!)
    // .subscribe(
    //   data => {
    //     this.recommendedTracks = data;
    //     this.router.navigate(['/recommendations'], { state: { recommendations: this.recommendedTracks, token: this.accessToken } });
    //     console.log(this.recommendedTracks);
    //   }
    // )
}
}
