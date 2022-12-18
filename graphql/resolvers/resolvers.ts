import { rootType } from "../../interfaces/graphqlInterfaces/schemaInterfaces";
import { User } from "@graphql-types"
import cookie from 'cookie'

export const root: rootType = {
    Query: {
        async hello() {
            try {
                return "Hey"
            } catch( e ) { 
                console.log( e ) 
            }
        },
        
        books: ( _, args: any, { req } ) => {
        
            console.log( req.headers.authorization )

            return [
                {
                title: "The Awakening",
                author: "Kate Chopin",
                },

                {
                title: "City of Glass",
                author: "Paul Auster",
                },
            ];
        },

        user( _, args, { req } ): User {

            console.log( req.headers.authorization )

            return {
                email: "hey",
                password: "hi",
                username: "hello"
            }
        },
        async login( _, args, { req, res } ) {
            try {   

                res.cookie( "hey", "hi" )
                return { ...args }

            } catch( e: any ) {
                console.log( e )
            }
        },

        async register( _, args, { req, res } ) {
            try {

                return { ...args }

            } catch( e: any ) {
                console.log( e )
            }
        },
    },
}