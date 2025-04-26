"use server"

import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient()

export async function getPosts() {
    const allPosts = await prisma.post.findMany()
    // console.log("allPosts in supabase", allPosts);
    return allPosts
}

export async function createPost(formData: FormData) {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const tags = formData.get("tags") as string;
    const image = formData.get("image") as string;
    const userId = formData.get("userId") as string;
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
        await prisma.post.create({
            data: {
                title,
                description,
                tags,
                image,
                userId,
                username
            }
        })
        return { success: true, message: 'Todo added' }
    } catch (error) {
        console.log("Error addTodo:", error);
        return { success: false, message: 'Todo failed to add' }
    }
}

