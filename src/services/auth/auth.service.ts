import { FirebaseAdapter } from '@/services/adapters/firebase/firebase-adapter';

export class AuthService {
  private readonly adapter;

  constructor() {
    this.adapter = FirebaseAdapter.getInstance();
  }

  async login(email: string, password: string) {
    return await this.adapter.auth.loginWithEmail(email, password);
  }

  isAuthenticated() {
    return this.adapter.auth.isAuthenticated();
  }
}
