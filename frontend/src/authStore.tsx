import { create } from 'zustand';

type AuthState = { // Define el estado de autenticación
  username: string;
  email: string;
  token: string | null;
  tokenType: string | null;
  state: boolean;
  setUsername: (username: string) => void;
  setEmail: (email: string) => void;
  setToken: (token: string) => void;
  setTokenType: (tokenType: string) => void;
  setState: (state: boolean) => void;
};

export const userAuthStore = create<AuthState>((set) => ({ // Crea el store de autenticación del usuario
  username: '',
  email: '',
  token: null,
  tokenType: null,
  state: false,
  setUsername: (username) => set({ username }),
  setEmail: (email) => set({ email }),
  setToken: (token) => set({ token }),
  setTokenType: (tokenType) => set({ tokenType }),
  setState: (state) => set({ state }),
}));

export const projectAuthStore = create<AuthState>((set) => ({ // Crea el store de autenticación del proyecto
  username: '',
  email: '',
  token: null,
  tokenType: null,
  state: false,
  setUsername: (username) => set({ username }),
  setEmail: (email) => set({ email }),
  setToken: (token) => set({ token }),
  setTokenType: (tokenType) => set({ tokenType }),
  setState: (state) => set({ state }),
}));

type teamState = { // Define el estado de autenticación del equipo
  team_id: number | null;
  token: string | null;
  tokenType: string | null;
  state: boolean;
  setTeamId: (team_id: number) => void;
  setToken: (token: string) => void;
  setTokenType: (tokenType: string) => void;
  setState: (state: boolean) => void;
};

export const teamAuthStore = create<teamState>((set) => ({ // Crea el store de autenticación del equipo
  team_id: null,
  token: null,
  tokenType: null,
  state: false,
  setTeamId: (team_id) => set({ team_id }),
  setToken: (token) => set({ token }),
  setTokenType: (tokenType) => set({ tokenType }),
  setState: (state) => set({ state }),
}));
