import { NgModule } from '@angular/core';
import { RouterModule, Routes, mapToCanActivate } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { canActivate, redirectUnauthorizedTo , redirectLoggedInTo} from "@angular/fire/auth-guard"
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ErrorComponent } from './error/error.component';
import { SobreMiComponent } from './sobre-mi/sobre-mi.component';

const redirectLoggedInToMain = () => redirectLoggedInTo(['home']);
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' }, // Redirige la página de inicio a 'home'
  { path: 'login', component: LoginComponent, ...canActivate(redirectLoggedInToMain) },
  { path: 'register', component: RegisterComponent },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [redirectUnauthorizedToLogin], // Guardia para la ruta home
    children: [
      { path: 'sobremi', component: SobreMiComponent },
    ],
  },
  { path: 'error', component: ErrorComponent },
  { path: '**', redirectTo: '/error' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
