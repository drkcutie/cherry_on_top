import { supabase } from '@/lib/supabase';

export const toggleLike = async (user_id: string, post_id?: number, comment_id?: number) => {
    
    if (!post_id && !comment_id) {
        console.error('No post_id or comment_id provided')
        return
    }

    const { data: activeLike, error } = await supabase
        .from('like')
        .select('*')
        .eq('user_id', user_id)
        .eq(post_id ? 'post_id' : 'comment_id', post_id ?? comment_id)
        .single()

    if (error && error.code !== "PGRST116") { // no rows found
        console.error(error.message)
        return
    }

    if (activeLike) {
        const { error: deleteError } = await supabase
            .from('like')
            .delete()
            .eq('id', activeLike.id)
        
        if (deleteError) {
            console.error(deleteError)
        }
        else {
            console.log('unliked') // placeholder
        }
    }
    else {
        const { error: insertError } = await supabase
            .from('like')
            .insert([
                {
                    user_id,
                    post_id: post_id ?? null,
                    comment_id: comment_id ?? null,
                    is_liked: true
                },
            ])

            if (insertError) {
                console.error(insertError)
            }
            else {
                console.log('liked') // placeholder
            }
    }
};