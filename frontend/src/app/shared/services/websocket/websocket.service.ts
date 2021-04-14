import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import * as web from "rxjs/webSocket";
import { Message } from 'src/app/core/models/message/message.model';
@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private subject = web.webSocket("ws://localhost:8081"); 
  private wsSubject = web.webSocket({
      url: 'ws://localhost:8081',
  //Apply any transformation of your choice.
      serializer: msg => JSON.stringify({channel: "webDevelopment", msg: msg})
  });
  // private subjectg: Subject<MessageEvent>;

  private message: Message;

  constructor() { }

  public openConnection() {
    this.subject.subscribe();
  }

  public pushMenssage(data: Message) {
    this.subject.next(data);
  }

  public closeConnection() {
    this.subject.complete();
  }

  public getConectionMenssage(): Observable<unknown> {
    return this.subject;
    // this.subject.subscribe(
    //   (msg: any) => {
    //     console.log(msg);
    //     this.message = msg;
    //   }, // Called whenever there is a message from the server.
    //   err => console.log(err), // Called if at any point WebSocket API signals some kind of error.
    //   () => console.log('complete') // Called when connection is closed (for whatever reason).
    // );
    // const observableA = this.subject.multiplex(
    //   () => ({subscribe: 'A'}), // When server gets this message, it will start sending messages for 'A'...
    //   () => ({unsubscribe: 'A'}), // ...and when gets this one, it will stop.
    //   message => true // If the function returns `true` message is passed down the stream. Skipped if the function returns false.
    // );
    // const subA = observableA.subscribe(messageForA => console.log(messageForA));
// socket.addEventListener('message', function (event) {
//   console.log('Message from server', event.data);
// });
  }

  public getMenssage(): Message {
    return this.message;
  }
}
