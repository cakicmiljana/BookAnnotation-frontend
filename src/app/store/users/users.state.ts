import { User } from "src/app/models/user";

export interface UsersState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}