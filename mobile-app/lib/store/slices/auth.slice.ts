import { StateCreator } from 'zustand';

import { ChatSlice } from './chat.slice';

import { generateGUID } from '~/utils/general.utils';

interface AuthState {
  id: string | undefined;
  username: string | undefined;
}

interface AuthMethods {
  setAuthSession: (username: string) => void;
  resetSession: () => void;
}

export type AuthSlice = AuthState & AuthMethods;

const initialState = {
  id: undefined,
  username: undefined,
} satisfies AuthState;

export const createAuthSlice: StateCreator<AuthSlice & ChatSlice, [], [], AuthSlice> = (set) => ({
  ...initialState,
  resetSession: () => set(initialState),
  setAuthSession: (username: string) =>
    set((state) => ({ ...state, id: generateGUID(), username })),
});
