import { create } from 'zustand';

import { AuthSlice, ChatSlice, createAuthSlice, createChatSlice } from './slices';

export const useAppStore = create<AuthSlice & ChatSlice>()((...a) => ({
  ...createAuthSlice(...a),
  ...createChatSlice(...a),
}));
