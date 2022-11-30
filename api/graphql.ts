import { graphqlHTTP } from 'express-graphql'
import { schema } from '../graphql/schema/schema' 
import { root } from '../graphql/resolvers/resolvers' 

export default graphqlHTTP( async( req: any, res ) => {
  
      return {
        schema,
        rootValue: root,
        graphiql: true,
        context: { req, res },
      }
})