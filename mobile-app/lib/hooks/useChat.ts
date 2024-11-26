import { useAppStore } from '../store';
import useSocket from './useSocket';

export default function useChat() {
  const rooms = useAppStore((state) => state.rooms);
  const appendNewMessage = useAppStore((state) => state.appendMessage);
  const addMessages = useAppStore((state) => state.addMessages);
  const { socket } = useSocket();

  const joinAllRooms = () => {
    rooms.forEach((room) => {
      socket?.emit('join_room', room.id);
      fetchRoom(room.id);
    });

    socket?.on('message', (message) => {
      appendNewMessage(message);
    });
  };

  const fetchRoom = async (roomId: string) => {
    const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/rooms/${roomId}`, {
      method: 'GET',
    });

    const room = await response.json();
    addMessages(room.messages);
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
