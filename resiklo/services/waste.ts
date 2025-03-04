import { supabase } from '@/lib/supabase';

export const  getWaste = async (image_id: number) => {
    
    const { data: waste, error } = await supabase
        .from('waste')
        .select('*')
        .eq('image_id', image_id)

    if (error) {
        console.log(error)
        return []
    }
    
    return waste
}