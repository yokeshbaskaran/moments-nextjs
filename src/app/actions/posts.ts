import { supabaseClient } from "@/supabase/client";

const supabase = supabaseClient()

export async function getPosts() {
    try {
        const { data: posts, error } = await supabase.from('posts').select('*').order('created_at', { ascending: false })
        if (error) {
            throw new Error(error.message);
        }

        return posts;
    } catch (error) {
        console.error("Error fetching posts:", error);
        throw error;
    }
}


export async function createPost(formData: FormData) {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const tags = formData.get("tags") as string;
    const image = formData.get("image") as string;
    const username = formData.get("username") as string;

    // const data = {
    //     title,
    //     description,
    //     tags,
    //     image,
    //     userId,
    //     username
    // }
    // console.log("allcreatePostPosts in supabase", data);

    try {
        const { data, error } = await supabase
            .from('posts')  // Name of your Supabase table
            .insert([
                {
                    title,
                    description,
                    tags,
                    image,
                    username
                }
            ]);

        if (error) {
            throw new Error(error.message);
        }

        return { success: true, message: 'Post added successfully', data };
    } catch (error) {
        console.error("Error creating post:", error);
        return { error: error };
    }
}


export async function deletePost(postId: string) {
    try {
        const { error } = await supabase.from('posts').delete().eq('id', postId);

        if (error) {
            return { errorMessage: error.message }
        }

        return { success: true }
    } catch (error) {
        console.error("Error delete-post:", error);
        throw error;
    }
}