import { Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import {
  OnGatewayInit,
  WsResponse,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets/interfaces';
import { Socket, Server } from 'socket.io';

@WebSocketGateway({ cors: true })
export class NotificationGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  afterInit(server: Server) {
    this.logger.log('Socket server started!');
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  private logger: Logger = new Logger('NotificationGateway');

  @SubscribeMessage('upload-success-to-server')
  handleMessage(client: Socket, text: string): WsResponse<string> {
    this.logger.log(`Message from client: ${text}`);
    return {
      event: 'upload-success-to-client',
      data: 'File Uploaded Successfully!',
    };
  }
}
