import { Component } from '@angular/core';
import { FormGroup , FormControl} from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  formReg : FormGroup;
  constructor(private userService : UserService, private router : Router) {
    this.formReg = new FormGroup({
      email: new FormControl(),
      password : new FormControl()
    })}


    onSubmit() {
        this.userService.login(this.formReg.value)
        .then(response =>  {
          console.log(response);
          this.router.navigate(["/home"]);
        })
        
        .catch(error => console.log(error));
    }

    redirectToRegister(){
      this.router.navigate(["/register"]);
    }

}