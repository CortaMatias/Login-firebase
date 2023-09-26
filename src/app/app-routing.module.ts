import { NgModule } from '@angular/core';
import { RouterModule, Routes, mapToCanActivate } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ErrorComponent } from './error/error.component';
import { SobreMiComponent } from './sobre-mi/sobre-mi.component';
import { AuthGuard } from './guards/auth.guard';
import { UserInfoComponent } from './user-info/user-info.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' }, 
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard], 
    children: [
      { path: 'sobremi', component: SobreMiComponent },
      { path: 'user-info', component: UserInfoComponent },
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
