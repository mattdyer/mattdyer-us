import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home.component';
import { SubpageComponent } from './pages/subpage.component';
import { NotFoundComponent } from './pages/notfound.component';
import { FishgameComponent } from './pages/fishgame/fishgame.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'subpage', component: SubpageComponent },
  { path: 'fishgame', component: FishgameComponent },
  { path: '**', component: NotFoundComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SubpageComponent,
    NotFoundComponent,
    FishgameComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
