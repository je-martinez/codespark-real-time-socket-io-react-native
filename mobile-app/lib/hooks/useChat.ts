import { useAppStore } from '../store';
import useSocket from './useSocket';

export default function useChat() {
  const rooms = useAppStore((state) => state.rooms);
  const { socket } = useSocket();

  const joinAllRooms = () => {
    rooms.forEach((room) => {
      socket?.emit('join_room', room.id);
    });

    socket?.on('message', (message) => {
      console.log(message);
    });
  };

  const leaveAllRooms = () => {
    rooms.forEach((room) => {
      socket?.emit('leave_room', room.id);
    });
  };

  const sendMessage = (room: string, message: string) => {
    socket?.emit('send_message', { room, message });
  };

  return { joinAllRooms, leaveAllRooms, sendMessage };
}
