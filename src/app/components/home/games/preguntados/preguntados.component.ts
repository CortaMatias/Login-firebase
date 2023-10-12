import { Component } from '@angular/core';
import { Pregunta, Result } from 'src/app/interfaces/pregunta.interface';
import { PreguntadosService } from 'src/app/services/preguntados.service';
import Swal from 'sweetalert2';
import { DomSanitizer } from '@angular/platform-browser';
import { interval , Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-preguntados',
  templateUrl: './preguntados.component.html',
  styleUrls: ['./preguntados.component.scss']
})
export class PreguntadosComponent {

  constructor(private preguntadosService : PreguntadosService, private sanitizer: DomSanitizer){}

opciones : string[] = ["Opcion 1", "Opcion 2 ", "Opcion 3", "Opcion 4"];
puntaje : number = 0;
categoria : string = "";
public pregunta : string | undefined;
public preguntaAPI!: Pregunta;
respuesta : string = "";
intervalo :any ;

time = 30;
stop$ = new Subject();


ngOnInit(){
  this.jugar();
}

ngOnDestroy(){
  this.stopCronometro();
  if (this.intervalo) {
    clearInterval(this.intervalo);
  }
}

jugar(){
  this.getPregunta();
  this.puntaje = 0;
  this.time = 30;
  this.startCronometro();
}




getPregunta() {
  this.preguntadosService.getPreguntaAPI().subscribe(pregunta => {
    this.preguntaAPI = pregunta;
    console.log(pregunta);
    this.categoria = this.preguntaAPI.results[0].category;
    this.pregunta = this.preguntaAPI.results[0].question;
    this.opciones = this.preguntaAPI.results[0].incorrect_answers;
    this.opciones.push(this.preguntaAPI.results[0].correct_answer)
    this.opciones.sort(() => Math.random() - 0.5);
    this.respuesta = this.preguntaAPI.results[0].correct_answer;
    console.log(this.preguntaAPI.results[0].correct_answer);
  });
}

comprobar(opcion : string){
  if(opcion == this.respuesta){
    this.puntaje++;
    if (this.puntaje == 10){
      this.alertaGanador();
      }
    else this.continuar();
  } else {
    this.puntaje = 0;
    this.alertaPerdedor();
  }
}

continuar() {
  this.getPregunta();
  this.time = 30;
}

decodeHtml(html: string) {
  return this.sanitizer.bypassSecurityTrustHtml(html);
}

stopCronometro() {
  this.stop$.next(null);
}

startCronometro() {
  this.stop$ = new Subject();
  this.intervalo = interval(1000)
    .pipe(takeUntil(this.stop$))
    .subscribe(() => {
      if(this.time == 0){   
        this.alertaTiempo();      
      }else {
        this.time--;
      }
    });
}

alertaPerdedor() {
  this.stopCronometro();
  Swal.fire({
    title: 'Perdiste',
    icon: 'error',
    text: 'La respuesta correcta era: ' + this.respuesta,
    confirmButtonColor: '#E33939',
    color: '#000000',
    confirmButtonText: 'Retry',
    background: '#fff',
  }).then(() => { this.jugar();});
}

alertaGanador() {
  this.stopCronometro();
  Swal.fire({
    title: 'Ganaste',
    icon: 'success',
    color: '#000000',
    confirmButtonColor: '#0f0',
    confirmButtonText: 'Continue',
    background: '#fff',
  }).then(()=> { this.jugar(); })
}

alertaTiempo() {
  this.stopCronometro();
  Swal.fire({
    title: 'Perdiste',
    icon: 'error',
    text: "Se te acabo el tiempo para responder",
    confirmButtonColor: '#E33939',
    color: '#000000',
    confirmButtonText: 'Retry',
    background: '#fff',
  }).then(() => {this.jugar();});
}

}
