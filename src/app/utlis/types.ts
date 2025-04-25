export type Login = {
    email: string
    password: string
}

export type Register = Login & {
    username: string
}