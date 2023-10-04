import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { FormsModule } from '@angular/forms';
import { ChatComponent } from './chat.component';
import { AngularFireModule } from '@angular/fire/compat';


@NgModule({
  declarations: [ChatComponent],
  imports: [
    CommonModule,
    ChatRoutingModule, 
    FormsModule,
    AngularFireModule
    
  ]
})
export class ChatModule { }
