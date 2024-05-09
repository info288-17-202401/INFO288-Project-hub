import { create } from 'zustand';

type AuthState = {
  email: string;
  token: string | null;
  tokenType: string | null;
  state: boolean;
  setEmail: (email: string) => void;
  setToken: (token: string) => void;
  setTokenType: (tokenType: string) => void;
  setState: (state: boolean) => void;
};

export const userAuthStore = create<AuthState>((set) => ({
  email: '',
  token: null,
  tokenType: null,
  state: false,
  setEmail: (email) => set({ email }),
  setToken: (token) => set({ token }),
  setTokenType: (tokenType) => set({ tokenType }),
  setState: (state) => set({ state }),
}));

export const projectAuthStore = create<AuthState>((set) => ({
  email: '',
  token: null,
  tokenType: null,
  state: false,
  setEmail: (email) => set({ email }),
  setToken: (token) => set({ token }),
  setTokenType: (tokenType) => set({ tokenType }),
  setState: (state) => set({ state }),
}));
