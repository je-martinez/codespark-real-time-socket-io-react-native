import { v4 as uuidv4 } from 'uuid';
import { StateCreator } from 'zustand';

import { ChatSlice } from './chat.slice';

interface AuthState {
  id: string | undefined;
  username: string | undefined;
}

interface AuthMethods {
  setAuthSession: (username: string) => void;
}

export type AuthSlice = AuthState & AuthMethods;

const initialState = {
  id: undefined,
  username: undefined,
} satisfies AuthState;

export const createAuthSlice: StateCreator<AuthSlice & ChatSlice, [], [], AuthSlice> = (set) => ({
  ...initialState,
  setAuthSession: (username: string) => set({ id: uuidv4(), username }),
});
