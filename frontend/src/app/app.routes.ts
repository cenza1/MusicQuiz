import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { CallbackComponent } from './callback/callback.component';
import { RecommendationsComponent } from './recommendations/recommendations.component';
import { QuizPlayerComponent } from './quiz-player/quiz-player.component';

export const routes: Routes = [
  { path: '', component: MainPageComponent},
  // Add more routes as needed
  {path: 'callback', component: CallbackComponent},
  {path: 'recommendations', component: RecommendationsComponent},
  {path: 'quiz-player', component: QuizPlayerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
