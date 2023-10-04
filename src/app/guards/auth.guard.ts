import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../services/user.service'; 

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) {}

  canActivate(): Promise<boolean> {
    return new Promise((resolve) => {
      this.userService.getCurrentUser()
        .then((user) => {
          if (user) {
            resolve(true);
          } else {
            this.router.navigate(['auth/login']);
            resolve(false);
          }
        })
        .catch((error) => {
          console.log(error);
          this.router.navigate(['auth/login']);
          resolve(false);
        });
    });
  }
}
