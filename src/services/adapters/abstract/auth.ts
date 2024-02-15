import { type User } from '@/types/auth';

export abstract class AuthAdapter {
  abstract loginWithEmail(
    email: string,
    password: string,
  ): Promise<User | undefined>;
  abstract logout(): Promise<boolean>;
}
