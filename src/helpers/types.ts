export type Login = {
    email: string
    password: string
}

export type Register = Login & {
    username: string
}

export interface Post {
    id: string;
    title: string;
    description: string;
    tags: string;
    image: string;
    userId: string;
    username: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface SinglePostProps {
    post: Post
}