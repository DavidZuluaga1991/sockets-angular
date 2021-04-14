import { Component } from '@angular/core';
import { WebsocketService } from './shared/services/websocket/websocket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';
  
  constructor() {}

}
