import {
  type Auth,
  type AuthError,
  getAuth,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { AuthAdapter } from '@/services/adapters/abstract/auth';
import { firebaseBaseApp } from '@/services/adapters/firebase/firebase.config';

export class FirebaseAuthAdapter extends AuthAdapter {
  private readonly auth: Auth;

  constructor() {
    super();
    this.auth = getAuth(firebaseBaseApp);
  }

  async loginWithEmail(email: string, password: string) {
    let success = false;

    try {
      await signInWithEmailAndPassword(this.auth, email, password);
      success = true;
    } catch (e) {
      const error = e as AuthError;
      console.error(error);
      return error?.message;
    }

    return success;
  }

  isAuthenticated() {
    return this.auth.currentUser !== null;
  }

  async logout() {
    return false;
  }
}
