import { rootType } from "../../interfaces/graphqlInterfaces/schemaInterfaces";
import { User } from "@graphql-types"

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
        async login( _, args, { req } ) {
            try {
    
                console.log( args )
                return { ...args }

            } catch( e: any ) {
                console.log( e )
            }
        }
    },
}