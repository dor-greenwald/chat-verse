import { useEffect, useState } from 'react';
import { websocketService } from '../services/websocket.service';
import type { ChatMessage } from '../interfaces/interfaces';

interface UseWebSocketOptions {
  onMessage?: (message: ChatMessage) => void;
  onConnect?: () => void;
  onDisconnect?: () => void;
  onError?: (error: Error) => void;
  autoConnect?: boolean;
}

interface UseWebSocketResult {
  isConnected: boolean;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
}

export const useWebSocket = (options: UseWebSocketOptions = {}): UseWebSocketResult => {
  const [isConnected, setIsConnected] = useState(false);
  const { autoConnect = true } = options;

  const handleError = (error: Error) => {
    console.error('WebSocket error:', error);
    if (options.onError) {
      options.onError(error);
    }
  };

  const connect = async () => {
    try {
      await websocketService.connect();
      setIsConnected(true);
      if (options.onConnect) {
        options.onConnect();
      }
    } catch (error) {
      handleError(error instanceof Error ? error : new Error('Failed to connect to WebSocket'));
      setIsConnected(false);
    }
  };

  const disconnect = async () => {
    try {
      await websocketService.disconnect();
      setIsConnected(false);
      if (options.onDisconnect) {
        options.onDisconnect();
      }
    } catch (error) {
      handleError(error instanceof Error ? error : new Error('Failed to disconnect from WebSocket'));
    }
  };

  useEffect(() => {
    let mounted = true;

    const setupWebSocket = async () => {
      if (autoConnect && !isConnected) {
        await connect();
      }
    };

    setupWebSocket();

    // Subscribe to messages if handler is provided
    const unsubscribe = options.onMessage 
      ? websocketService.onMessage(options.onMessage)
      : () => {};

    // Cleanup on unmount
    return () => {
      mounted = false;
      unsubscribe();
      // Only disconnect if the component is actually unmounting
      if (document.visibilityState === 'hidden') {
        disconnect();
      }
    };
  }, [options.onMessage, options.onConnect, options.onDisconnect, options.onError, autoConnect]);

  return {
    isConnected,
    connect,
    disconnect
  };
}; 