import {
  MessageBody,
  ConnectedSocket,
  WebSocketServer,
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

@WebSocketGateway(3002, { cors: { origin: '*' } })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  handleConnection(client: Socket, ...args: any[]) {
    client.broadcast.emit('message', `client ${client.id} connected`);
  }
  handleDisconnect(client: any) {
    this.server.emit('message', `client ${client.id} disconnected`);
  }

  @SubscribeMessage('message')
  handleNeMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() message: any,
  ) {
    console.log(message);
    // client.emit("message" , "hello friend")
    client.broadcast.emit('message', ` ${client.id}  : ${message}`);
  }
}
