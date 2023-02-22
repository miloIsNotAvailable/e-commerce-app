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

export type cartType = {
    items: ({
        img: string,
        title: string
        desc: string
        id: string
    })[]
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

export type cartItemsState = {
    cartItems: cartType
}