import type { User } from "./user";

export type Permissions = {
  [key: string]: boolean;
};

// --- Interface Credentials (payload login)
export interface Credentials {
  username: string;
  password: string;
}

// --- Interface AuthState (state auth client)
export interface AuthState {
  user: User | null;
  token: string;
  permissions: Permissions;
  login: (credentials: Credentials) => Promise<void>;
  logout: () => void;
}
