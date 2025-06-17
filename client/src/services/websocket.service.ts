import { io, Socket } from 'socket.io-client';
import type { ChatMessage } from '../interfaces/interfaces';

// Private variables
let socket: Socket | null = null;
let messageHandlers: ((message: ChatMessage) => void)[] = [];
const SOCKET_URL = 'http://localhost:3000';

export const websocketService = {
  async connect(): Promise<void> {
    if (socket?.connected) {
      return;
    }

    socket = io(SOCKET_URL, {
      transports: ['websocket'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      timeout: 20000,
      autoConnect: true
    });

    socket.on('connect', () => {
      console.log('Connected to WebSocket server');
    });

    socket.on('disconnect', (reason) => {
      console.log('Disconnected from WebSocket server. Reason:', reason);
      // Only attempt to reconnect if it wasn't a client-initiated disconnect
      if (reason !== 'io client disconnect') {
        console.log('Attempting to reconnect...');
        socket?.connect();
      }
    });

    socket.on('connect_error', (error) => {
      console.error('Connection error:', error);
    });

    socket.on('error', (error) => {
      console.error('Socket error:', error);
    });

    socket.on('message', (message: ChatMessage) => {
      console.log('Received message:', {
        id: message.id,
        chatId: message.chatId,
        senderId: message.senderId,
        senderName: message.senderName,
        text: message.text,
        createdAt: message.createdAt
      });
      messageHandlers.forEach(handler => handler(message));
    });

    return new Promise((resolve, reject) => {
      if (!socket) {
        reject(new Error('Socket not initialized'));
        return;
      }

      socket.on('connect', () => resolve());
      socket.on('connect_error', (error) => reject(error));
    });
  },

  async disconnect(): Promise<void> {
    if (socket) {
      // Remove all listeners before disconnecting
      socket.removeAllListeners();
      socket.disconnect();
      socket = null;
    }
  },

  sendMessage(message: ChatMessage): void {
    if (!socket?.connected) {
      console.error('Cannot send message: Socket not connected');
      throw new Error('Socket not connected');
    }
    console.log('Sending message:', {
      id: message.id,
      chatId: message.chatId,
      senderId: message.senderId,
      senderName: message.senderName,
      text: message.text,
      createdAt: message.createdAt
    });
    socket.emit('message', message, (error: Error | null) => {
      if (error) {
        console.error('Error sending message:', error);
      } else {
        console.log('Message sent successfully');
      }
    });
  },

  onMessage(handler: (message: ChatMessage) => void): () => void {
    messageHandlers.push(handler);
    return () => {
      messageHandlers = messageHandlers.filter(h => h !== handler);
    };
  }
}; 