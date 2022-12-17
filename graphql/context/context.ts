import { ExpressContextFunctionArgument } from '@apollo/server/express4'

export default async function context ({ req }: ExpressContextFunctionArgument ) {
    // console.log( "e" )
    return { token: req.headers.authentication, req }
}