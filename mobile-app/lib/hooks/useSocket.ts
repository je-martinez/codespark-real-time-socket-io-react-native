import { useContext } from 'react';

import { SocketContext } from '../store/providers';

export default function useSocket() {
  const { socket } = useContext(SocketContext);

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

  return { connect, disconnect, registerListener, removeAllListeners, removeListener };
}
