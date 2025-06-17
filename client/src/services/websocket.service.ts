import { io, Socket } from 'socket.io-client';
import type { ChatMessage } from '../interfaces/interfaces';

// Private variables
let socket: Socket | null = null;
let messageHandlers: ((message: ChatMessage) => void)[] = [];
const SOCKET_URL = 'http://localhost:3000';

// Add a flag to track if we're currently connecting
let isConnecting = false;
let retryInterval: NodeJS.Timeout | null = null;
const RETRY_DELAY = 5000; // 5 seconds

const startRetryInterval = () => {
  if (retryInterval) {
    clearInterval(retryInterval);
  }
  
  retryInterval = setInterval(() => {
    if (!socket?.connected && !isConnecting) {
      console.log('Retrying connection...');
      websocketService.connect().catch(error => {
        console.error('Retry connection failed:', error);
      });
    }
  }, RETRY_DELAY);
};

const stopRetryInterval = () => {
  if (retryInterval) {
    clearInterval(retryInterval);
    retryInterval = null;
  }
};

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
        reconnection: false, // We'll handle reconnection manually
        timeout: 20000,
        autoConnect: true,
        forceNew: false // Prevent duplicate connections
      });

      socket.on('connect', () => {
        console.log('Connected to WebSocket server');
        isConnecting = false;
        stopRetryInterval(); // Stop retrying when connected
      });

      socket.on('disconnect', (reason) => {
        console.log('Disconnected from WebSocket server. Reason:', reason);
        isConnecting = false;
        // Start retry interval when disconnected
        startRetryInterval();
      });

      socket.on('connect_error', (error) => {
        console.error('Connection error:', error);
        isConnecting = false;
        // Start retry interval on connection error
        startRetryInterval();
      });

      socket.on('error', (error) => {
        console.error('Socket error:', error);
        isConnecting = false;
        // Start retry interval on socket error
        startRetryInterval();
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
          isConnecting = false;
          reject(new Error('Socket not initialized'));
          return;
        }

        socket.on('connect', () => resolve());
        socket.on('connect_error', (error) => {
          isConnecting = false;
          reject(error);
        });
      });
    } catch (error) {
      isConnecting = false;
      startRetryInterval(); // Start retry interval on error
      throw error;
    }
  },

  async disconnect(): Promise<void> {
    isConnecting = false;
    stopRetryInterval(); // Stop retry interval when disconnecting
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