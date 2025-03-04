import { supabase } from '@/lib/supabase';

export const getAllPosts = async () => {
  const { data: post, error } = await supabase.from('post').select('*');

  if (error) {
    console.log(error);
    return [];
  }

  return post;
};

export const getPost = async (id: string) => {
  const { data: post, error } = await supabase.from('post').select('*').eq('id', id);

  if (error) {
    console.log(error);
    return [];
  }

  return post;
};
