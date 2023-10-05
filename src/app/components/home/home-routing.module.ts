import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';

const routes: Routes = [
  { path: '', component: HomeComponent,
    children: [   
      {
        path: 'sobre-mi', loadChildren: () => import ('./sobre-mi/sobre-mi.module')
        .then(mod => mod.SobreMiModule)
      },
      {
        path: 'chat', loadChildren: () => import ('./chat/chat.module')
        .then(mod => mod.ChatModule),
      },
      {
        path: 'user-info', loadChildren: () => import ('./user-info/user-info.module')
        .then(mod => mod.UserInfoModule)
      },
      {
        path: 'games', loadChildren: () => import ('./games/games.module')
        .then(mod => mod.GamesModule)
      },
      {
        path: 'ahorcado', loadChildren: () => import ('./games/ahorcado/ahorcado.module')
        .then(mod => mod.AhorcadoModule)
      },

  ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
