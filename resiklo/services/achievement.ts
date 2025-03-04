import { supabase } from '@/lib/supabase';

export const getAchievement = async () => {
    const { data: achievement, error } = await supabase
    .from('achievement')
    .select('*')
    return achievement
}