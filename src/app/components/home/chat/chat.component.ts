import { Component } from '@angular/core';
import { Mensaje } from 'src/app/interfaces/mensaje.interface';
import { ChatService } from 'src/app/services/chat.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {
  mensajes: Mensaje[] = [];
  nuevoMensaje: Mensaje = { emisor: '', texto: '', fecha: '' };
  usuario : any;
  suscripcion : any ;

  constructor(private mensajesService: ChatService, private userService : UserService) { }

  ngOnInit(): void {
   this.suscripcion=  this.mensajesService.getMsg().subscribe(data => {
      this.mensajes = data.map(e => {
        return {
          id: e.id,
          ...e as Mensaje
        } as Mensaje;
      })
    });

    this.userService.getCurrentUser().then(user => {
      this.usuario = user;
    }).catch(error => {
      console.error('Ocurrió un error al obtener el usuario:', error);
    });
  }

  enviarMensaje(): void {
    this.nuevoMensaje.emisor = this.usuario?.displayName;
    this.nuevoMensaje.fecha = this.obtenerFecha()
    if(this.nuevoMensaje.texto !== '')
    this.mensajesService.addMsg(this.nuevoMensaje);
    this.nuevoMensaje = { emisor: '', texto: '', fecha: '' };
  }


  obtenerFecha(): string {
    let ahora = new Date();   
    let dia = ahora.getDate();
    let mes = ahora.getMonth() + 1; 
    let año = ahora.getFullYear();
    let horas = ahora.getHours();
    let minutos = ahora.getMinutes();
    let segundos = ahora.getSeconds();
    let diaStr = dia < 10 ? '0' + dia.toString() : dia.toString();
    let mesStr = mes < 10 ? '0' + mes.toString() : mes.toString();
    let segSrt = segundos < 10 ? '0' + segundos.toString() : segundos.toString();
    let fechaFormateada = `${diaStr}/${mesStr}/${año} ${horas}:${minutos}:${segSrt}`;

    return fechaFormateada;
}

}
