import { supabase } from '@/lib/supabase';

export const getComment = async (post_id: string) => {
  const { data: comment, error } = await supabase
    .from('comment')
    .select('*')
    .eq('post_id', post_id);

  if (error) {
    console.log(error);
    return [];
  }

  return comment;
};
