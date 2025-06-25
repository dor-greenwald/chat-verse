import { io, Socket } from 'socket.io-client';
import type { ChatMessage } from '../interfaces/interfaces';

// Private variables
let socket: Socket | null = null;
let messageHandlers: ((message: ChatMessage) => void)[] = [];
const SOCKET_URL = 'http://localhost:3000';

// Add a flag to track if we're currently connecting
let isConnecting = false;

export const websocketService = {
  async connect(): Promise<void> {
    // If we're already connected or connecting, don't try to connect again
    if (socket?.connected || isConnecting) {
      return;
    }

    isConnecting = true;

    try {
      // If there's an existing socket, clean it up first
      if (socket) {
        socket.removeAllListeners();
        socket.disconnect();
        socket = null;
      }

      socket = io(SOCKET_URL, {
        transports: ['websocket'],
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        timeout: 20000,
        autoConnect: true,
        forceNew: false // Prevent duplicate connections
      });

      socket.on('message', (message: ChatMessage) => {
        messageHandlers.forEach(handler => handler(message));
      });

      return new Promise((resolve, reject) => {
        if (!socket) {
          isConnecting = false;
          reject(new Error('Socket not initialized'));
          return;
        }

        socket.on('connect', () => {
          isConnecting = false;
          resolve();
        });

        socket.on('connect_error', (error) => {
          isConnecting = false;
          reject(error);
        });
      });
    } catch (error) {
      isConnecting = false;
      throw error;
    }
  },

  async disconnect(): Promise<void> {
    isConnecting = false;
    if (socket) {
      socket.removeAllListeners();
      socket.disconnect();
      socket = null;
    }
  },

  sendMessage(message: ChatMessage): void {
    if (!socket?.connected) {
      throw new Error('Socket not connected');
    }
    socket.emit('message', message, (error: Error | null) => {
      if (error) {
        console.error('%c[WebSocket] Error sending message:', 'color: #F44336; font-weight: bold', error);
      }
    });
  },

  onMessage(handler: (message: ChatMessage) => void): () => void {
    messageHandlers.push(handler);
    return () => {
      messageHandlers = messageHandlers.filter(h => h !== handler);
    };
  },

  getSocket(): Socket | null {
    return socket;
  }
}; 
