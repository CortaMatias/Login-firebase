import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GamesRoutingModule } from './games-routing.module';
import { RouterModule } from '@angular/router';
import { AhorcadoComponent } from './ahorcado/ahorcado.component';
import { MayorMenorComponent } from './mayor-menor/mayor-menor.component';
import { PreguntadosComponent } from './preguntados/preguntados.component';


@NgModule({
  declarations: [AhorcadoComponent, MayorMenorComponent, PreguntadosComponent],
  imports: [
    CommonModule,
    GamesRoutingModule,
  ], 
  exports : [AhorcadoComponent]
})
export class GamesModule { }
