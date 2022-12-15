import { Request, Response } from "express";

type funcType = {
    [name: string]: ( args: any, context: contextType ) => any | Promise<any>
} 

export type rootType = {
    Query?: funcType,
    Mutation?: funcType
}

export type RootFunction = ( args: any, context: contextType ) => any | Promise<any>

export type contextType = {
    req: Request,
    res: Response,
    user: any | undefined
}