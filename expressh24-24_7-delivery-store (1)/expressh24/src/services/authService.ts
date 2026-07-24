import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { UserProfile, UserRole } from '../types';

export const authService = {
  async signUp(email: string, password: string, fullName: string, phone: string) {
    if (!isSupabaseConfigured()) {
      return { user: { id: 'mock-user-1', email, user_metadata: { full_name: fullName, phone } }, error: null };
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          phone: phone,
          role: 'customer'
        }
      }
    });

    if (!error && data.user) {
      // Upsert into public.users
      await supabase.from('users').upsert({
        id: data.user.id,
        email,
        full_name: fullName,
        phone,
        role: 'customer'
      });
    }

    return { data, error };
  },

  async signIn(email: string, password: string) {
    if (!isSupabaseConfigured()) {
      return { data: { session: null, user: null }, error: null };
    }

    return await supabase.auth.signInWithPassword({
      email,
      password
    });
  },

  async signInWithGoogle() {
    if (!isSupabaseConfigured()) {
      alert('Veuillez d\'abord configurer vos clés Supabase.');
      return;
    }

    return await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin
      }
    });
  },

  async signOut() {
    if (!isSupabaseConfigured()) return { error: null };
    return await supabase.auth.signOut();
  },

  async resetPassword(email: string) {
    if (!isSupabaseConfigured()) return { data: {}, error: null };
    return await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`
    });
  },

  async getCurrentSession() {
    if (!isSupabaseConfigured()) return null;
    const { data } = await supabase.auth.getSession();
    return data.session;
  },

  async getUserProfile(userId: string): Promise<UserProfile | null> {
    if (!isSupabaseConfigured()) return null;

    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (error || !data) return null;

    return {
      id: data.id,
      email: data.email,
      name: data.full_name || 'Utilisateur',
      phone: data.phone || '',
      role: data.role as UserRole,
      avatarUrl: data.avatar_url,
      savedAddresses: [],
      favorites: []
    };
  },

  async updateUserRole(userId: string, role: UserRole) {
    if (!isSupabaseConfigured()) return { error: null };

    return await supabase
      .from('users')
      .update({ role })
      .eq('id', userId);
  }
};
