import { type AuthAdapter } from '@/services/adapters/abstract/auth';

export class AuthService {
  private readonly adapter: AuthAdapter;
  constructor(authAdapter: AuthAdapter) {
    this.adapter = authAdapter;
  }

  async login(email: string, password: string) {
    return await this.adapter.loginWithEmail(email, password);
  }
}
