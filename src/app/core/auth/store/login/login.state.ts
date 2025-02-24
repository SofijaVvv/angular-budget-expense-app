import { User } from '../../../models/user.model';

export interface LoginState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}
