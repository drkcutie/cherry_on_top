import { supabase } from '@/lib/supabase';

export const getAllVouchers = async () => {

    let { data: voucher, error } = await supabase
        .from('voucher')
        .select('*')

    if (error) {
        console.log(error)
        return []
    }

    return voucher   
}