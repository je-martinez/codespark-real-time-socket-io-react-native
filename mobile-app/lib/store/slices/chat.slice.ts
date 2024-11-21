import { StateCreator } from 'zustand';

import { AuthSlice } from './auth.slice';

import { Message } from '~/types';
import { generateGUID } from '~/utils';

interface ChatState {
  messages: Message[];
}

interface ChatMethods {
  appendMessage: (message: Message) => void;
}

export type ChatSlice = ChatState & ChatMethods;

const initialState = {
  messages: [],
} satisfies ChatState;

export const createChatSlice: StateCreator<ChatSlice & AuthSlice, [], [], ChatSlice> = (set) => ({
  ...initialState,
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
