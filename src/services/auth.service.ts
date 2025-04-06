import { supabase } from '@/lib/supabase';
import useAuthStore from '@/store/useAuthStore';

export const authService = {
  // Sign in with email/password
  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    if (data.user) {
      useAuthStore.getState().setIsAuthenticated(true);
      return data;
    }

    return null;
  },

  // Sign up with email/password
  async signUp(email: string, password: string) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) throw error;
    return data;
  },

  // Sign out
  async signOut() {
    const { error } = await supabase.auth.signOut();
    useAuthStore.getState().setIsAuthenticated(false);
    if (error) throw error;
  },

  // Reset password
  async resetPassword(email: string) {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) throw error;
  },

  // Get current session
  async getSession() {
    const { data, error } = await supabase.auth.getSession();

    if (error) throw error;

    if (data.session) {
      useAuthStore.getState().setIsAuthenticated(true);
    } else {
      useAuthStore.getState().setIsAuthenticated(false);
    }

    return data.session;
  },
};
