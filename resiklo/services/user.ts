import { supabase } from '@/lib/supabase';

export const checkIfExists = async (id: string): Promise<boolean> => {
  const { data, error } = await supabase.from('user_info').select(id).eq('uid', id).single();

  if (error) {
    console.log(error);
    return false;
  }

  // return data ? true : false
  return !!data;
};

export const getUser = async (id: string) => {
  const exists = await checkIfExists(id);

  if (!exists) {
    return null;
  }

  const { data: user_info, error } = await supabase
    .from('user_info')
    .select('*')
    .eq('id', id)
    .single();

  return user_info;
};
