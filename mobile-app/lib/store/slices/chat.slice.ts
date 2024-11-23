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
}

export type ChatSlice = ChatState & ChatMethods;

const initialState = {
  rooms: [
    {
      id: '1',
      name: 'Room 1',
    },
    {
      id: '2',
      name: 'Room 2',
    },
    {
      id: '3',
      name: 'Room 3',
    },
  ],
  messages: [],
} satisfies ChatState;

export const createChatSlice: StateCreator<ChatSlice & AuthSlice, [], [], ChatSlice> = (set) => ({
  ...initialState,
  setupRooms: (rooms: Room[]) => set({ rooms }),
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
