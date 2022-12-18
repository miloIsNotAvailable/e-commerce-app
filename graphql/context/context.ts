import { ExpressContextFunctionArgument } from '@apollo/server/express4'
import cookies from 'cookie'
import jwt from 'jsonwebtoken'

export default async function context ({ req, res }: ExpressContextFunctionArgument ) {
    
    const refresh_token_cookie = req.cookies["refresh_token"]
    const access_token_cookie = req.cookies["access_token"]

    try { 
        if( !refresh_token_cookie ) {
            // throw new Error( "user not logged in" )
            return { token: "", req, res }
        }

        const access_token_decoded = jwt.verify( access_token_cookie, process.env.access_TOKEN! )
        
        return { token: access_token_cookie, req, res }
    } catch( e ) {
        // console.log( e )
        
        const refresh_token_decoded: any = jwt.verify( refresh_token_cookie, process.env.REFRESH_TOKEN! )
        if( !refresh_token_decoded ) {
            throw new Error( "invalid refresh token" )
        }

        console.log( refresh_token_decoded )

        res.setHeader( 
            'Set-Cookie',
            [
                cookies.serialize(
                "access_token", refresh_token_decoded, {
                    httpOnly: true,
                    secure: true,
                    maxAge: 60 * 60 * 24 * 7,
                    path: "/"
                } 
                )
            ]                         
        )
        return { token: "", req, res }
    }
}