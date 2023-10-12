import { Component } from '@angular/core';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-mayor-menor',
  templateUrl: './mayor-menor.component.html',
  styleUrls: ['./mayor-menor.component.scss'],
})
export class MayorMenorComponent {
  
  cartas: string[] = [
    'assets/Cartas/1debasto.png',
    'assets/Cartas/2debasto.png',
    'assets/Cartas/3debasto.png',
    'assets/Cartas/4debasto.png',
    'assets/Cartas/5debasto.png',
    'assets/Cartas/6debasto.png',
    'assets/Cartas/7debasto.png',
    'assets/Cartas/10debasto.png',
    'assets/Cartas/11debasto.png',
    'assets/Cartas/12debasto.png',
    'assets/Cartas/1decopa.png',
    'assets/Cartas/2decopa.png',
    'assets/Cartas/3decopa.png',
    'assets/Cartas/4decopa.png',
    'assets/Cartas/5decopa.png',
    'assets/Cartas/6decopa.png',
    'assets/Cartas/7decopa.png',
    'assets/Cartas/10decopa.png',
    'assets/Cartas/11decopa.png',
    'assets/Cartas/12decopa.png',
    'assets/Cartas/1deespada.png',
    'assets/Cartas/2deespada.png',
    'assets/Cartas/3deespada.png',
    'assets/Cartas/4deespada.png',
    'assets/Cartas/5deespada.png',
    'assets/Cartas/6deespada.png',
    'assets/Cartas/7deespada.png',
    'assets/Cartas/10deespada.png',
    'assets/Cartas/11deespada.png',
    'assets/Cartas/12deespada.png',
    'assets/Cartas/1deoro.png',
    'assets/Cartas/2deoro.png',
    'assets/Cartas/3deoro.png',
    'assets/Cartas/4deoro.png',
    'assets/Cartas/5deoro.png',
    'assets/Cartas/6deoro.png',
    'assets/Cartas/7deoro.png',
    'assets/Cartas/10deoro.png',
    'assets/Cartas/11deoro.png',
    'assets/Cartas/12deoro.png',
  ];

  cartaAnterior: string = '';
  cartaNueva: string = '';
  puntaje: number = 0;
  mayor: boolean = false;
  mazo: string[] = [...this.cartas];

  ngOnInit() {
    this.elegirCarta();
  }


comprobar(mayor: Boolean) {
    this.cartaAnterior = this.cartaNueva;

    this.elegirCarta();
    let valorAnterior = this.obtenerValorNumerico(this.cartaAnterior);
    let valorNueva = this.obtenerValorNumerico(this.cartaNueva);
    if (
      (mayor && valorNueva! > valorAnterior!) ||
      (!mayor && valorNueva! < valorAnterior!) ||
      valorNueva == valorAnterior
    ) {
      this.puntaje++;
      if (this.puntaje === this.cartas.length) this.mostrarAlertaGanador();
    } else {
      this.mostrarAlertaPerdedor();
    }
  }


  elegirCarta() {
    const index = Math.floor(Math.random() * this.mazo.length);
    this.cartaNueva = this.mazo[index];
    this.mazo.splice(index, 1);
  }

  obtenerValorNumerico(cartaNombre: string) {
    const numeroCarta = cartaNombre.match(/\d+/);
    return numeroCarta ? parseInt(numeroCarta[0]) : null;
  }

  reiniciarJuego() {
    this.puntaje = 0;
    this.mazo = [...this.cartas];
    this.elegirCarta();
    this.cartaAnterior = '';
  }

  mostrarAlertaGanador() {
    Swal.fire({
      title: '¡Ganaste!',
      icon: 'success',
      text: 'Has alcanzado el puntaje máximo y el mazo está vacío.',
      confirmButtonColor: '#4CAF50',
      confirmButtonText: 'Reiniciar',
      background: '#fff',
    }).then(() => {
      this.reiniciarJuego();
    });
  }


  mostrarAlertaPerdedor() {
    Swal.fire({
      title: 'Perdiste',
      icon: 'error',
      text: `Tu puntaje es: ${this.puntaje}`,
      confirmButtonColor: '#E33939',
      confirmButtonText: 'Reintentar',
      background: '#fff',
    }).then(() => {
      this.reiniciarJuego();
    });
  }

  
}
