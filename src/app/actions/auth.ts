"use server";

import { supabaseServer } from "@/supabase/server";
import { Login, Register } from "../utlis/types";

export async function registerAccount({ email, password, username }: Register) {
    // const data = { email, password, username }
    // console.log("user-data:", data);

    //supabase 
    const { auth } = await supabaseServer();
    const { error } = await auth.signUp({
        email, password, options: {
            data: {
                username
            }
        }
    });

    if (error) {
        return { errorMessage: error.message }
    }

    return { errorMessage: null }
}

export async function loginAccount({ email, password, }: Login) {
    // const data = { email, password }
    // console.log("user-data:", data);

    //supabase 
    const { auth } = await supabaseServer();
    const { error } = await auth.signInWithPassword({
        email, password,
    });

    if (error) {
        return { errorMessage: error.message }
    }

    return { errorMessage: null }
}

export async function logout() {
    // const data = { email, password }
    // console.log("user-data:", data);

    //supabase 
    const { auth } = await supabaseServer();
    const { error } = await auth.signOut()

    if (error) {
        return { errorMessage: error.message }
    }

    return { errorMessage: null }
}