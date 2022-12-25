
export type userDataType = {
    email?: string
    password?: string
    username?: string
    error?: {
        email: string | undefined
        password: string | undefined
        username: string | undefined
    }
}

export type itemInputType = {
    title?: string
    desc?: string
    img?: string
}

export type userDataState = {
    userData: userDataType
}

export type itemDataState = {
    inputData: itemInputType
}