import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators  } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'; // Importar SweetAlert2

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  formReg: FormGroup;

  constructor(
    private userService: UserService,
    private router: Router
  ) {
    this.formReg = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]), 
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      username: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.formReg.valid) {
      const registrationData = this.formReg.value;
      this.userService.register(registrationData)
        .then(user => {
          this.handleRegistrationSuccess(user);
        })
        .catch(error => this.handleRegistrationError(error));
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error en el formulario',
        text: 'Por favor, verifica los campos del formulario.',
      });
    }
  }

  handleRegistrationSuccess(response: any) {
    console.log(response);
    this.userService.login(this.formReg.value)
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Registro exitoso',
          text: '¡Usuario registrado correctamente!',
          showConfirmButton: false,
          timer: 1500, // 1.5 segundos
        }).then(() => {          
          this.router.navigate(["/home"]);
        });
      })
      .catch(error => {
        console.error('Error al iniciar sesión automáticamente:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error al iniciar sesión automáticamente',
          text: 'Hubo un problema al iniciar sesión automáticamente después del registro.',
        });
      });
  }

  handleRegistrationError(error: any) {
    console.log(error);
    Swal.fire({
      icon: 'error',
      title: 'Error de registro',
      text: 'El registro ha fallado. Ese email ya se encuentra registrado.',
    });
  }
}
