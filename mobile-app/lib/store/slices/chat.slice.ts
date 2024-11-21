import { v4 as uuidv4 } from 'uuid';
import { StateCreator } from 'zustand';

import { AuthSlice } from './auth.slice';

interface ChatState {
  id: string | undefined;
  username: string | undefined;
}

interface ChatMethods {
  setChatSession: (username: string) => void;
}

export type ChatSlice = ChatState & ChatMethods;

const initialState = {
  id: undefined,
  username: undefined,
} satisfies ChatState;

export const createChatSlice: StateCreator<ChatSlice & AuthSlice, [], [], ChatSlice> = (set) => ({
  ...initialState,
  setChatSession: (username: string) => set({ id: uuidv4(), username }),
});
