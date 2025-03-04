import { supabase } from '@/lib/supabase';
import { useUser } from '@/app/provider';

import * as SecureStore from 'expo-secure-store';
export const signInWithEmail = async (
  email: string,
  password: string,
  remember: boolean,
  setUser: (user: any) => void
) => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    console.error('Error @signInWithEmail:', error);
    throw error;
  }

  if (data.session) {
    const userId = data.user?.id;

    if (remember) {
      await SecureStore.setItemAsync('access_token', data.session.access_token);
      await SecureStore.setItemAsync('refresh_token', data.session.refresh_token);
    }

    const { data: userInfo, error: userError } = await supabase
      .from('user_info')
      .select('*')
      .eq('uid', userId)
      .single();

    if (userError) {
      console.error('Error fetching user info:', userError);
      throw userError;
    }

    setUser(userInfo);
  }

  return data.session;
};

export const signUpWithEmail = async (
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  setUser: (user: any) => void
) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password
  });

  if (error) {
    console.error('Error @signUpWithEmail:', error);
    return { session: null, error };
  }

  if (!data.session) {
    console.warn('Please check your inbox for email verification!');
    return { session: null, error: 'Verification required' };
  }

  await SecureStore.setItemAsync('access_token', data.session.access_token);
  await SecureStore.setItemAsync('refresh_token', data.session.refresh_token);

  const userInfoObj = {
    uid: data.user?.id,
    first_name: firstName,
    last_name: lastName,
    email_address: email,
    image_url: ''
  };

  const { error: insertError } = await supabase.from('user_info').insert([userInfoObj]);

  if (insertError) {
    console.error('Error inserting user into database:', insertError);
    return { session: null, error: insertError };
  }

  setUser(userInfoObj);

  return { session: data.session, error: null };
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
