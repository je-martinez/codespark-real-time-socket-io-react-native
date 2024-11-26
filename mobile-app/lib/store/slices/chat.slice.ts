import { StateCreator } from 'zustand';

import { AuthSlice } from './auth.slice';

import { Message, Room } from '~/types';
import { generateGUID } from '~/utils';

interface ChatState {
  rooms: Room[];
  messages: Message[];
}

interface ChatMethods {
  appendMessage: (message: Message) => void;
  getRoom: (id: string) => Room | undefined;
  getMessagesByRoom: (id: string) => Message[];
}

export type ChatSlice = ChatState & ChatMethods;

const initialState = {
  rooms: [
    {
      id: 'room1',
      name: 'Room 1',
    },
    {
      id: 'room2',
      name: 'Room 2',
    },
    {
      id: 'room3',
      name: 'Room 3',
    },
    {
      id: 'room4',
      name: 'Room 4',
    },
    {
      id: 'room5',
      name: 'Room 5',
    },
  ],
  messages: [],
} satisfies ChatState;

export const createChatSlice: StateCreator<ChatSlice & AuthSlice, [], [], ChatSlice> = (
  set,
  get
) => ({
  ...initialState,
  setupRooms: (rooms: Room[]) => set({ rooms }),
  getRoom: (id) => {
    const rooms = get().rooms;
    return rooms.find((room) => room.id === id);
  },
  getMessagesByRoom: (id) => {
    const messages = get().messages;
    return messages
      .filter((message) => message.roomId === id)
      .sort((a, b) => a.date.getTime() - b.date.getTime());
  },
  appendMessage: (message) =>
    set((state) => ({
      messages: [
        ...state.messages,
        {
          ...message,
          id: message.id || generateGUID(),
          date: message.date || new Date(),
        },
      ],
    })),
});
