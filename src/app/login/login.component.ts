import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  formReg: FormGroup;

  constructor(private userService: UserService, private router: Router) {
    this.formReg = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]), // Aplica validadores al campo email
      password: new FormControl('', [Validators.required]), // Aplica validadores al campo password
    });
  }

  onSubmit() {
    if (this.formReg.valid) {
      this.userService
        .login(this.formReg.value)
        .then((response) => this.handleLoginSuccess(response))
        .catch((error) => this.handleLoginError(error));
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error en el formulario',
        text: 'Por favor, verifica los campos del formulario.',
      });
    }
  }

  handleLoginSuccess(response: any) {
    console.log(response);
    Swal.fire({
      icon: 'success',
      title: 'Inicio de sesión exitoso',
      text: '¡Bienvenido!',
      showConfirmButton: false,
      timer: 1500, // 1.5 segundos
    }).then(() => {
      this.router.navigate(['/home']);
    });
  }

  handleLoginError(error: any) {
    console.log(error);
    Swal.fire({
      icon: 'error',
      title: 'Error de inicio de sesión',
      text: 'El inicio de sesión ha fallado. Por favor, verifica tus credenciales.',
    });
  }

  autoLogin() {
    this.formReg.controls['email'].setValue(this.userService.demoUser.email);
    this.formReg.controls['password'].setValue(this.userService.demoUser.password);
  }

  redirectToRegister() {
    this.router.navigate(['/register']);
  }
}
