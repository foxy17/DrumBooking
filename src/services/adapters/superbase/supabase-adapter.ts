import { createClient } from '@supabase/supabase-js';
import { SupabaseAuthAdapter } from './auth-adapter';

export class CombinedSupabaseAdapter {
  private readonly authAdapter;
  private readonly storageAdapter: any;

  constructor() {
    const url = import.meta.env.VITE_SUPABASE_URL;
    const anonKey = import.meta.env.VITE_SUPABASE_ANON;
    const client = createClient(url, anonKey);
    this.authAdapter = new SupabaseAuthAdapter(client);
  }

  get auth() {
    return this.authAdapter;
  }
}
