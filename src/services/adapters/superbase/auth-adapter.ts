import { toast } from 'react-toastify';
import { type SupabaseClient } from '@supabase/supabase-js';
import { AuthAdapter } from '@/services/adapters/abstract/auth';

export class SupabaseAuthAdapter extends AuthAdapter {
  private readonly client: SupabaseClient;
  constructor(client: SupabaseClient) {
    super();
    this.client = client;
  }

  async loginWithEmail(
    email: string,
    password: string,
  ): Promise<boolean | string> {
    const { data, error } = await this.client.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return error.message;
    }

    return !!data.user;
  }

  async logout(): Promise<boolean> {
    const { error } = await this.client.auth.signOut();
    if (error) {
      toast.error(error.message ?? 'Error logging out');
      return false;
    }
    return true;
  }

  isAuthenticated(): boolean {
    return false;
  }
}
