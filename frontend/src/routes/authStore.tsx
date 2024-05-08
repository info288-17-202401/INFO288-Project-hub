import create from 'zustand';

type AuthState = {
  token: string | null;
  tokenType: string | null;
  setToken: (token: string) => void;
  setTokenType: (tokenType: string) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  tokenType: null,
  setToken: (token) => set({ token }),
  setTokenType: (tokenType) => set({ tokenType }),
}));
