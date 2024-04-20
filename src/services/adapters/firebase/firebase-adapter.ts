import { getFirestore } from 'firebase/firestore';
import { FirebaseAuthAdapter } from './auth-adapter';
import { firebaseBaseApp } from './firebase.config';

export class FirebaseAdapter {
  private static instance: FirebaseAdapter;
  private readonly authAdapter;
  private readonly firestoreAdapter: any;

  private constructor() {
    this.authAdapter = new FirebaseAuthAdapter();
    this.firestoreAdapter = getFirestore(firebaseBaseApp);
  }

  public static getInstance(): FirebaseAdapter {
    if (!FirebaseAdapter.instance) {
      FirebaseAdapter.instance = new FirebaseAdapter();
    }

    return FirebaseAdapter.instance;
  }

  get auth() {
    return this.authAdapter;
  }

  get storage() {
    // Might need correction based on actual usage
    return this.firestoreAdapter;
  }
}
