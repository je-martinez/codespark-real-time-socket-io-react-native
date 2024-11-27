import { StateCreator } from 'zustand';

import { AuthSlice } from './auth.slice';

import { Message, Room } from '~/types';

interface ChatState {
  rooms: Room[];
  messages: Message[];
}

interface ChatMethods {
  appendMessage: (message: Message) => void;
  addMessages: (messages: Message[]) => void;
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
    return messages.filter((message) => message.roomId === id);
  },
  appendMessage: (message) =>
    set((state) => {
      const messages = state.messages;
      return {
        ...state,
        messages: mergeMessages([message], messages),
      };
    }),
  addMessages: (messages) =>
    set((state) => {
      return {
        ...state,
        messages: mergeMessages(messages, state.messages),
      };
    }),
});

export function mergeMessages(newMessages: Message[], currentMessages: Message[]): Message[] {
  const messageMap = new Map<string, Message>();
  currentMessages.forEach((message) => {
    messageMap.set(message.id, message);
  });
  newMessages.forEach((newMessage) => {
    messageMap.set(newMessage.id, newMessage);
  });
  return Array.from(messageMap.values());
}
