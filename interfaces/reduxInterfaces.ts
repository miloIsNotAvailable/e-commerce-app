import { ItemCategories } from "@graphql-types"

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
    category?: ItemCategories
}

export type openReviewInputType = {
    open: boolean
}

export type userDataState = {
    userData: userDataType
}

export type itemDataState = {
    inputData: itemInputType
}

export type reviewInputState = {
    reviewInput: openReviewInputType
}