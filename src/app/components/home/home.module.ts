import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { SideNavComponent } from './side-nav/side-nav.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { FormsModule } from '@angular/forms';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from 'src/environments/environment';


@NgModule({
  declarations: [
    SideNavComponent,
    HomeComponent,
  ],
  imports: [
    RouterModule,
    CommonModule,
    HomeRoutingModule,
    FormsModule, 
  ]
})
export class HomeModule { }
