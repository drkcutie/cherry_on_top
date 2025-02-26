import { supabase } from '@/lib/supabase';

import * as SecureStore from 'expo-secure-store';

export const signInWithEmail = async (email: string, password: string, remember: boolean) => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    console.error('Error @signInWithEmail: ', error);
    throw error;
  }

  if (data.session && remember) {
    await SecureStore.setItemAsync('access_token', data.session.access_token);
    await SecureStore.setItemAsync('refresh_token', data.session.refresh_token);
  }

  return data.session;
};

export const signUpWithEmail = async (email: string, password: string) => {
  const {
    data: { session },
    error
  } = await supabase.auth.signUp({
    email: email,
    password: password
  });

  if (error) {
    console.error('Error @signUpWithEmail: ', error);
  }

  if (!session) {
    console.error('Please check your inbox for email verification!');
  }
};

export const signOut = async () => {
  await supabase.auth.signOut();
  await SecureStore.deleteItemAsync('access_token');
  await SecureStore.deleteItemAsync('refresh_token');
};

export const setSession = async (accessToken: string, refreshToken: string) => {
  await supabase.auth.setSession({
    access_token: accessToken,
    refresh_token: refreshToken
  });
};

export const getSession = async () => {
  const session = await supabase.auth.getSession();
  return session.data.session;
};
