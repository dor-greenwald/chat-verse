import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { websocketService } from '../../services/websocket.service';
import type { ChatMessage } from '../../interfaces/interfaces';

interface WebSocketContextType {
  isConnected: boolean;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  onMessage: (handler: (message: ChatMessage) => void) => () => void;
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

export const useWebSocketContext = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error('useWebSocketContext must be used within a WebSocketProvider');
  }
  return context;
};

interface WebSocketProviderProps {
  children: ReactNode;
}

export const WebSocketProvider: React.FC<WebSocketProviderProps> = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);

  const connect = async () => {
    try {
      console.log('%c[WebSocket] Attempting to connect...', 'color: #2196F3; font-weight: bold');
      await websocketService.connect();
      setIsConnected(true);
    } catch (error) {
      console.error('%c[WebSocket] Failed to connect:', 'color: #F44336; font-weight: bold', error);
      setIsConnected(false);
    }
  };

  const disconnect = async () => {
    try {
      console.log('%c[WebSocket] Disconnecting...', 'color: #FFA726; font-weight: bold');
      await websocketService.disconnect();
      setIsConnected(false);
    } catch (error) {
      console.error('%c[WebSocket] Failed to disconnect:', 'color: #F44336; font-weight: bold', error);
    }
  };

  const onMessage = (handler: (message: ChatMessage) => void) => {
    return websocketService.onMessage(handler);
  };

  useEffect(() => {
    let mounted = true;

    const setupSocket = async () => {
      try {
        await connect();
      } catch (error) {
        console.error('%c[WebSocket] Initial connection failed:', 'color: #F44336; font-weight: bold', error);
      }
    };

    setupSocket();

    const socket = websocketService.getSocket();
    if (socket) {
      const handleConnect = () => {
        if (mounted) {
          console.log('%c[WebSocket] Connected to server', 'color: #4CAF50; font-weight: bold');
          setIsConnected(true);
        }
      };

      const handleDisconnect = (reason: string) => {
        if (mounted) {
          console.log('%c[WebSocket] Disconnected from server', 'color: #FFA726; font-weight: bold', 'Reason:', reason);
          setIsConnected(false);
        }
      };

      const handleConnectError = (error: Error) => {
        if (mounted) {
          console.error('%c[WebSocket] Connection error:', 'color: #F44336; font-weight: bold', error);
          setIsConnected(false);
        }
      };

      const handleError = (error: Error) => {
        if (mounted) {
          console.error('%c[WebSocket] Socket error:', 'color: #F44336; font-weight: bold', error);
          setIsConnected(false);
        }
      };

      const handleReconnectAttempt = (attemptNumber: number) => {
        if (mounted) {
          console.log(
            '%c[WebSocket] Reconnection attempt:', 
            'color: #2196F3; font-weight: bold',
            `Attempt ${attemptNumber} of 5`
          );
        }
      };

      const handleReconnect = (attemptNumber: number) => {
        if (mounted) {
          console.log(
            '%c[WebSocket] Successfully reconnected!', 
            'color: #4CAF50; font-weight: bold',
            `After ${attemptNumber} attempts`
          );
          setIsConnected(true);
        }
      };

      const handleReconnectError = (error: Error) => {
        if (mounted) {
          console.error(
            '%c[WebSocket] Reconnection error:', 
            'color: #F44336; font-weight: bold',
            error
          );
        }
      };

      const handleReconnectFailed = () => {
        if (mounted) {
          console.error(
            '%c[WebSocket] Failed to reconnect after all attempts', 
            'color: #F44336; font-weight: bold; background: #FFEBEE'
          );
        }
      };

      // Add all event listeners
      socket.on('connect', handleConnect);
      socket.on('disconnect', handleDisconnect);
      socket.on('connect_error', handleConnectError);
      socket.on('error', handleError);
      socket.on('reconnect_attempt', handleReconnectAttempt);
      socket.on('reconnect', handleReconnect);
      socket.on('reconnect_error', handleReconnectError);
      socket.on('reconnect_failed', handleReconnectFailed);

      // Cleanup function
      return () => {
        mounted = false;
        socket.off('connect', handleConnect);
        socket.off('disconnect', handleDisconnect);
        socket.off('connect_error', handleConnectError);
        socket.off('error', handleError);
        socket.off('reconnect_attempt', handleReconnectAttempt);
        socket.off('reconnect', handleReconnect);
        socket.off('reconnect_error', handleReconnectError);
        socket.off('reconnect_failed', handleReconnectFailed);
      };
    }
  }, []);

  return (
    <WebSocketContext.Provider value={{ isConnected, connect, disconnect, onMessage }}>
      {children}
    </WebSocketContext.Provider>
  );
}; 
