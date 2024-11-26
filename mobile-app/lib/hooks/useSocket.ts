import { useContext, useState } from 'react';
import { io } from 'socket.io-client';

import { SocketContext } from '../store/providers';

export default function useSocket() {
  const { socket, setSocket } = useContext(SocketContext);
  const [isConnected, seIsConnected] = useState<boolean>(false);

  const init = (username?: string) => {
    const socket = io(process.env.EXPO_PUBLIC_API_URL, {
      autoConnect: false,
    });

    setSocket(socket);

    socket.on('connect', () => {
      seIsConnected(true);
      socket.emit('setup_name', username);
    });

    socket.on('disconnect', () => {
      seIsConnected(false);
    });

    socket.connect();
  };

  const registerListener = <T>(event: string, cb: (data: T) => void) => {
    if (socket) {
      socket.on(event, cb);
    }
  };

  const removeListener = (event: string) => {
    if (socket) {
      socket.off(event);
    }
  };

  const removeAllListeners = () => {
    if (socket) {
      socket.removeAllListeners();
    }
  };

  const connect = () => {
    if (socket) {
      socket.connect();
    }
  };

  const disconnect = () => {
    if (socket) {
      socket.disconnect();
    }
  };

  return {
    socket,
    init,
    connect,
    disconnect,
    registerListener,
    removeAllListeners,
    removeListener,
    isConnected,
  };
}
