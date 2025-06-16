import { io, Socket } from 'socket.io-client';

// Private variables
let socket: Socket;
let messageHandlers: ((message: any) => void)[] = [];
let isConnecting: boolean = false;
let connectionPromise: Promise<void> | null = null;

// Initialize socket
const initializeSocket = () => {
  socket = io('http://localhost:3000', {
    transports: ['websocket'],
    autoConnect: false,
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
  });

  socket.on('connect', () => {
    console.log('Connected to WebSocket server');
    isConnecting = false;
  });

  socket.on('disconnect', () => {
    console.log('Disconnected from WebSocket server');
    isConnecting = false;
  });

  socket.on('connect_error', (error) => {
    console.error('Connection error:', error);
    isConnecting = false;
  });

  socket.on('message', (message: any) => {
    messageHandlers.forEach(handler => handler(message));
  });
};

// Initialize socket on module load
initializeSocket();

// Public API
export const websocketService = {
  async connect() {
    if (socket.connected) {
      return;
    }

    if (isConnecting) {
      return connectionPromise;
    }

    isConnecting = true;
    connectionPromise = new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        isConnecting = false;
        reject(new Error('Connection timeout'));
      }, 5000);

      socket.once('connect', () => {
        clearTimeout(timeout);
        resolve();
      });

      socket.once('connect_error', (error) => {
        clearTimeout(timeout);
        isConnecting = false;
        reject(error);
      });

      socket.connect();
    });

    return connectionPromise;
  },

  async disconnect() {
    if (!socket.connected) {
      return;
    }

    return new Promise<void>((resolve) => {
      socket.once('disconnect', () => {
        resolve();
      });
      socket.disconnect();
    });
  },

  sendMessage(message: any) {
    if (!socket.connected) {
      console.warn('Socket is not connected. Message not sent:', message);
      return;
    }
    socket.emit('message', message);
  },

  onMessage(handler: (message: any) => void) {
    messageHandlers.push(handler);
    return () => {
      messageHandlers = messageHandlers.filter(h => h !== handler);
    };
  },

  isConnected() {
    return socket.connected;
  }
}; 