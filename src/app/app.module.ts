import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home.component';
import { SubpageComponent } from './pages/subpage.component';
import { NotFoundComponent } from './pages/notfound.component';
import { FishgameComponent } from './pages/fishgame/fishgame.component';
import { FishComponent } from './pages/fishgame/animals/fish/fish.component';
import { BugComponent } from './pages/fishgame/animals/bug/bug.component';
import { AnimalComponent } from './pages/fishgame/animals/animal/animal.component';

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
    FishgameComponent,
    FishComponent,
    BugComponent,
    AnimalComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [FishComponent,BugComponent]
})
export class AppModule { }
