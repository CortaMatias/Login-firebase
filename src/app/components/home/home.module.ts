import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { SideNavComponent } from './side-nav/side-nav.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { FormsModule } from '@angular/forms';
import { GamesComponent } from './games/games.component';


@NgModule({
  declarations: [
    SideNavComponent,
    HomeComponent,
    GamesComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    HomeRoutingModule,
    FormsModule, 
  ]
})
export class HomeModule { }
