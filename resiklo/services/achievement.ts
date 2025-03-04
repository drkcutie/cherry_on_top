import { supabase } from '@/lib/supabase';

export const getAllAchievements = async () => {

    const { data: achievement, error } = await supabase
        .from('achievement')
        .select('*')

    if (error) {
        console.log(error)
        return []
    }

    return achievement
}

export const getAchievementsByUser = async (user_id: string) => {
    
    const { data: achievement_users, error } = await supabase
        .from('achievement_users')
        .select('*')
        .eq('user_id', user_id)

    if (error) {
        console.log(error)
        return []
    }

    return achievement_users
}