import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

// Private variables
const logger = new Logger('ChatGateway');
const connectedClients = new Map<string, Socket>();
let globalServer: Server;

// Create the gateway using a factory function
export const createChatGateway = () => {
  @WebSocketGateway({
    cors: {
      origin: '*', // In production, replace with your actual frontend URL
    },
  })
  class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {
    @WebSocketServer()
    server: Server;

    afterInit(server: Server) {
      globalServer = server;
      logger.log('WebSocket Gateway initialized');
    }

    handleConnection(client: Socket) {
      logger.log(`Client connected: ${client.id}`);
      connectedClients.set(client.id, client);
      logger.log(`Total connected clients: ${connectedClients.size}`);
    }

    handleDisconnect(client: Socket) {
      logger.log(`Client disconnected: ${client.id}`);
      connectedClients.delete(client.id);
      logger.log(`Total connected clients: ${connectedClients.size}`);
    }

    @SubscribeMessage('message')
    handleMessage(client: Socket, payload: any): void {
      logger.log(`Received message from ${client.id}:`, payload);
      
      // Simulate a response back to the client
      const response = {
        type: 'response',
        content: `Roger that`,
        timestamp: new Date().toISOString(),
      };

      // Send response back to the client
      client.emit('message', response);
      logger.log(`Sent response to ${client.id}`);
    }
  }

  return ChatGateway;
};

// Export utility functions
export const sendMessageToClient = (clientId: string, message: any) => {
  const client = connectedClients.get(clientId);
  if (client) {
    client.emit('message', message);
    logger.log(`Sent message to client ${clientId}`);
  } else {
    logger.warn(`Client ${clientId} not found`);
  }
};

export const broadcastMessage = (message: any) => {
  if (globalServer) {
    globalServer.emit('message', message);
    logger.log(`Broadcasted message to ${connectedClients.size} clients`);
  } else {
    logger.warn('Server not initialized, cannot broadcast message');
  }
}; 