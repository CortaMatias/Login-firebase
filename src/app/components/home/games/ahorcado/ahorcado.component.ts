import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.component.html',
  styleUrls: ['./ahorcado.component.scss']
})
export class AhorcadoComponent {
  public palabras: string[] = [
    "biblioteca",
    "mariposa",
    "elefante",
    "guitarra",
    "computadora",
    "television",
    "refrigerador",
    "matematicas",
    "universidad",
    "restaurantes",
    "supermercado",
    "fotografia",
    "cumpleaños",
    "automovil",
    "bicicleta",
    "helicoptero",
    "jirafa",
    "cocodrilo",
    "hipopotamo",
    "constelacion",
    "astronomia",
    "geografia",
    "arqueologia",
    "biologia",
    "quimica"
  ];
  
  public abecedario: string[] = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z"
  ];
  constructor() {
    this.palabraJuego = "_ ".repeat(this.palabra.length);
  }
  public palabraJuego: string = ""; 
  public palabra: string = this.palabras[Math.floor(Math.random() * this.palabras.length)];
  public intentos: number = 0;
  public partida: boolean | undefined = undefined;
  public botonClick: { [letra: string]: boolean } = {};


  comprobarClick(letra : string){
    if (!this.botonClick[letra]) {
      this.comprobarLetra(letra);

      const arrPalabra = this.palabraJuego.split(" ");

      for (let i = 0; i <= this.palabra.length; i++) {
        if (this.palabra[i] === letra) {
          arrPalabra[i] = letra;
        }
      }
      this.palabraJuego = arrPalabra.join(" ");
      this.botonClick[letra] = true;
      console.log(this.palabraJuego);
      console.log(this.palabra);
      this.verificarEstado();
    }
  }
  
  comprobarLetra(letra: string) {
    if (this.palabra.indexOf(letra) == -1) {
      this.intentos++;
    }
  }

  public verificarEstado() {
    const palabraArr = this.palabraJuego.split(" "); 
    const palabraChekear = palabraArr.join("");
  
    if (palabraChekear === this.palabra) {
      this.partida = true;
      this.alertaGanador();
    }
    else if (this.intentos === 6) {
      this.partida = false;
      this.alertaPerdedor();
    }
  }

 alertaGanador() {
    Swal.fire({
      title: 'Felicitaciones, adivinaste la palabra',
      icon: 'success',
      color: '#000000',
      background: '#D3D3D3',
      confirmButtonColor: '#0f0',
      confirmButtonText: 'Continue',
    });
  }

  public alertaPerdedor() {
    Swal.fire({
      title: 'Perdiste, te quedaste sin intentos',
      icon: 'error',
      confirmButtonColor: '#E33939',
      padding: '3em',
      color: '#000000',
      background: '#D3D3D3',
      confirmButtonText: 'Retry',
      text: 'La palabra era: ' + this.palabra,
    });
  }
  
  reiniciar() {
    window.location.reload();
  }

}
