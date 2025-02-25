import { supabase } from '@/lib/supabase';

export const signInWithEmail = async (email: string, password: string) => {
  const { error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password
  });

  if (error) {
    console.error('Error @signInWithEmail: ', error);
  }
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
