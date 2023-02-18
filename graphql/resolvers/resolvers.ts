import { rootType } from "../../interfaces/graphqlInterfaces/schemaInterfaces";
import { CreateReviewMutationVariables, ItemCategories, NewItemMutationVariables, User } from "@graphql-types"
import { createClient } from "@supabase/supabase-js";
import { uuid } from 'uuidv4'
import { decode } from 'base64-arraybuffer'
import { prisma } from "../../prisma/client";

const supabase = createClient( 
    "https://mqifkoalnglfauiiliet.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1xaWZrb2FsbmdsZmF1aWlsaWV0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njk4MzE1MDgsImV4cCI6MTk4NTQwNzUwOH0.s60VPkqpI4FW25QedxLU9y2kqDlCMgPj68QCZWwlERE"
)

// https://github.com/supabase/supabase/issues/7252#issuecomment-1162947501
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

        async getItems( _, { category }: { category: ItemCategories } ) {

            // console.log( category )

            const data = await prisma.item.findMany( {
                where: { category }
            } )

            // console.log( data )

            return data
        },
        async getItem( _, { id } ) {

            const [ data ] = await prisma.item.findMany( {
                where: { id: id },
                include: {
                    reviews: {
                        where: { 
                            item_id: id
                        }
                    }
                }
            } )

            return data
        },
        async getReviews( _, { item_id } ) {

            if( !item_id ) return;

            const data = await prisma.review.findMany( {
                where: { item_id }
            } )

            return data
        }
    },
    Mutation: {
        async newItem( _, args: NewItemMutationVariables, { req, res, user } ) {
        
            const itemId = uuid()

            const { data: data_, error } = await supabase.storage
            .from( "images" )
            .upload( `public/${ itemId }.jpg`, 
            Buffer.from(prepareBase64DataUrl( args.img ), 'base64'), 
            {
                contentType: "image/jpeg"
            } )
            
            if( error ) throw new Error( error.message )

            const { data: img } = supabase.storage
            .from( "images" )
            .getPublicUrl( `public/${ itemId }.jpg` )

            const data = await prisma.item.create( {
                data: {
                    ...args,
                    img: img.publicUrl,
                    author: { 
                        connect: {
                            id: user!.id
                        }
                    }
                }
            } )

            console.log( data )

            return args        
        },
        async createReview( _, { text, item_id }, { user } ) {

            // console.log( args )

            const data = await prisma.review.create( {
                data: {
                    text,
                    author: user!.id,
                    item: {
                        connect: {
                            id: item_id
                        }
                    }
                },
            } )

            return data
        }
    }
}