import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Message } from 'src/app/core/models/message/message.model';
import { WebsocketService } from '../../services/websocket/websocket.service';
import {
  of ,
  Subscription
} from 'rxjs';
import {
  concatMap,
  delay
} from 'rxjs/operators';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  public formChat: FormGroup;
  public messages: Message[] = [];

  constructor(private chat: WebsocketService, public fb: FormBuilder) {
    this.formChat = this.fb.group({
      author: new FormControl(null, [Validators.required]),
      message: new FormControl(null, [Validators.required]),
      date: new FormControl(null)
    });
    this.chat.openConnection();
    // this.dataMessage();
    // setInterval (() => { this.dataMessage(); }, 1000);
    
    this.dataMessage();
  }

  ngOnInit(): void {
  }

  public sendMsg() {
    this.formChat.controls['date'].setValue(new Date);
    this.chat.pushMenssage(this.formChat.value);
    // this.dataMessage();
    this.formChat.patchValue({
      message: null,
      date: null
    });
  }

  public dataMessage() {
    this.chat.getConectionMenssage().pipe(
      concatMap(item => of (item).pipe(delay(1000)))
    ).subscribe(
      (msg: any) => {
        this.messages.push(msg);
        // console.log(msg);
      },
      err => console.log(err),
      () => console.log('complete')
    );
    const message = this.chat.getMenssage();
    if (message) {
      this.messages.push(message);
    }
  }

  public getHour(date: string): string {
    const d = new Date(date);
    let hour = '';
    if (d.getHours() > 12) {
      hour += (d.getHours() - 12) + ':' + d.getMinutes() + 'pm';
    } else {
      hour += d.getHours() + ':' + d.getMinutes() + 'am';
    }
    return hour;
  }

  public getChatColor(m: Message): string {
    const property = m.author === this.formChat.controls['author'].value;
    return property ? '' : 'other';
  }

  public getShortword(text: string): string {
    return text[0];
  }

}
