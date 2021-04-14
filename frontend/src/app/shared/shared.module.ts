import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './components/chat/chat.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ChatComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    ChatComponent
  ]
})
export class SharedModule { }
