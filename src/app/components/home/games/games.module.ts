import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GamesRoutingModule } from './games-routing.module';
import { RouterModule } from '@angular/router';
import { AhorcadoComponent } from './ahorcado/ahorcado.component';


@NgModule({
  declarations: [AhorcadoComponent],
  imports: [
    CommonModule,
    GamesRoutingModule,
  ], 
  exports : [AhorcadoComponent]
})
export class GamesModule { }
