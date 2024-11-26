import { useAppStore } from '../store';
import useSocket from './useSocket';

export default function useChat() {
  const rooms = useAppStore((state) => state.rooms);
  const appendNewMessage = useAppStore((state) => state.appendMessage);
  const { socket } = useSocket();

  const joinAllRooms = () => {
    rooms.forEach((room) => {
      socket?.emit('join_room', room.id);
    });

    socket?.on('message', (message) => {
      appendNewMessage(message);
    });
  };

  const leaveAllRooms = () => {
    rooms.forEach((room) => {
      socket?.emit('leave_room', room.id);
    });
  };

  const sendMessage = (roomId: string, message: string) => {
    socket?.emit('send_message', { roomId, message });
  };

  return { joinAllRooms, leaveAllRooms, sendMessage };
}
