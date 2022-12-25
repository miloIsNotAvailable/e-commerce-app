import { ExpressContextFunctionArgument } from '@apollo/server/express4'
import cookies from 'cookie'
import jwt from 'jsonwebtoken'

/**
 * 
 * @param req is Express request
 * @param res is Express response
 * @param token is an encoded string
 * 
 * @description 
 * context provides req and res objects, 
 * as well as handles updating access tokens, which 
 * will be used for authorized links
 * 
 * @returns ```{ req, res, token }```
 * 
 * @example ```ts
 * // this is some query resolver
 * 
 * async function resolver( 
 *  parents,    // parent argument 
 *  args,       // graphQL variables
 * { req, res, token }  // values returned from context function
 * ) {...}
 * ```
*/
export default async function context ({ req, res }: ExpressContextFunctionArgument ) {
    
    const refresh_token_cookie = req.cookies["refresh_token"]
    const access_token_cookie = req.cookies["access_token"]

    try { 
        // user does not have access or refresh token
        if( !refresh_token_cookie ) {
            // throw new Error( "user not logged in" )
            return { token: "", req, res }
        }

        // check for access token 
        const access_token_decoded = jwt.verify( access_token_cookie, process.env.ACCESS_TOKEN! )
        
        return { user: access_token_decoded, req, res }
    } catch( e ) {
        // console.log( e )
        
        // if expired or malformed it'll return en error 
        // so here we check if refresh token is valid 
        const refresh_token_decoded: any = jwt.verify( refresh_token_cookie, process.env.REFRESH_TOKEN! )
        
        // if refresh token is invalid 
        // return token as empty string 
        if( !refresh_token_decoded ) {
            return { user: undefined, req, res }
        }

        console.log( refresh_token_decoded )

        // create new access token from decoded data 
        const new_access_token = jwt.sign( refresh_token_decoded, process.env.REFRESH_TOKEN! )

        // set new cookie
        res.setHeader( 
            'Set-Cookie',
            [
                cookies.serialize(
                "access_token", new_access_token, {
                    httpOnly: true,
                    secure: true,
                    maxAge: 60 * 60 * 24 * 7,
                    path: "/"
                } 
                )
            ]                         
        )
        // return token as encoded string
        return { user: refresh_token_decoded, req, res }
    }
}