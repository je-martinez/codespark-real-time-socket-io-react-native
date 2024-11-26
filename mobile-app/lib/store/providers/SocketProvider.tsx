import { createContext, useState, type PropsWithChildren } from 'react';
import { Socket } from 'socket.io-client';

interface Props extends PropsWithChildren {}

export const SocketContext = createContext<{
  socket: Socket | undefined;
  setSocket: React.Dispatch<React.SetStateAction<Socket | undefined>>;
}>({
  socket: undefined,
  setSocket: () => {},
});

export const SocketProvider = ({ children }: Props) => {
  const [socket, setSocket] = useState<Socket | undefined>(undefined);
  return <SocketContext.Provider value={{ socket, setSocket }}>{children}</SocketContext.Provider>;
};
