import { Request, Response } from "express";
// import { graphqlHTTP } from 'express-graphql'
// import { schema } from '../graphql/schema/schema' 
// import { root } from '../graphql/resolvers/resolvers' 

// export default graphqlHTTP( async( req: any, res ) => {
  
//       return {
//         schema,
//         rootValue: root,
//         graphiql: true,
//         context: { req, res },
//       }
// })

// import { prisma } from "../prisma/client";

export default async function handler( req: Request, res: Response ) {

    try {

        // const data = await prisma.users.findMany( {} );
        // console.log( data )
        
        res.send( { name: 'john Doe' } )

    } catch( e ) {  console.log( e ) }

}
