import { rootType } from "../../interfaces/graphqlInterfaces/schemaInterfaces";
import { NewItemMutationVariables, User } from "@graphql-types"
import { createClient } from "@supabase/supabase-js";
import { uuid } from 'uuidv4'
import { decode } from 'base64-arraybuffer'

const supabase = createClient( 
    "https://mqifkoalnglfauiiliet.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1xaWZrb2FsbmdsZmF1aWlsaWV0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njk4MzE1MDgsImV4cCI6MTk4NTQwNzUwOH0.s60VPkqpI4FW25QedxLU9y2kqDlCMgPj68QCZWwlERE"
)

const prepareBase64DataUrl = ( base64: string ) =>
  base64
    .replace('data:image/jpeg;', 'data:image/jpeg;charset=utf-8;')
    .replace(/^.+,/, '')

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
    Mutation: {
        async newItem( _, args: NewItemMutationVariables, { req, res, user } ) {
        
            const itemId = uuid()

            const { data, error } = await supabase.storage
            .from( "images" )
            .upload( `public/${ itemId }.jpg`, 
            Buffer.from(prepareBase64DataUrl( args.img ), 'base64'), 
            {
                contentType: "image/jpeg"
            } )
            
            if( error ) throw new Error( error.message )

            return args        
        }
    }
}