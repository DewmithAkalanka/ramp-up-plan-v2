import { Component } from '@angular/core';

import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private socket: Socket) {
    this.socket.on('msgToClient', (data: string) => {
      console.log(data);
    });
  }

  title = 'client';
}
