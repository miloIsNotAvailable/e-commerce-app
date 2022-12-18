import { getDirective, MapperKind, mapSchema } from "@graphql-tools/utils";
import { defaultFieldResolver, GraphQLError, GraphQLSchema } from "graphql";
import { prisma } from '../../../../prisma/client'
import { Users } from '@prisma/client'
import cookies from 'cookie'
import jwt from 'jsonwebtoken'
import { contextType } from "../../../../interfaces/graphqlInterfaces/schemaInterfaces";

type getUserFnType = ( args: { email: string, password: string } ) => Promise<Users | null | undefined>

export default function loginDirective(
directiveName: string,
getUserFn: getUserFnType
) {
const typeDirectiveArgumentMaps: Record<string, any> = {};

return {
loginDirectiveTypeDefs: `directive @${directiveName} (
    email: String!
    password: String!
  ) on OBJECT | FIELD_DEFINITION`,
loginDirectiveTransformer: (schema: GraphQLSchema) =>
    mapSchema(schema, {
    [MapperKind.TYPE]: (type) => {
        const loginDirective = getDirective(schema, type, directiveName)?.[0];
        if (loginDirective) {
        typeDirectiveArgumentMaps[type.name] = loginDirective;
        }
        return undefined;
    },
    [MapperKind.OBJECT_FIELD]: (fieldConfig, _fieldName, typeName) => {
        const loginDirective =
        getDirective(schema, fieldConfig, directiveName)?.[0] ??
        typeDirectiveArgumentMaps[typeName];
        if (loginDirective) {
        const { requires } = loginDirective;
        if (requires) {
            const { resolve = defaultFieldResolver } = fieldConfig;
            fieldConfig.resolve = async function (source, args, context: contextType, info) {
    
                try {
                    const user = await getUserFn( args );
                    
                    const { req, res } = context
                    const refresh_token_cookie = req.cookies["refresh_token"]

                    if( refresh_token_cookie ) throw new Error( "you're already logged in" )
              
                    const refresh_token = jwt.sign( user!, process.env.REFRESH_TOKEN!, {} )
              
                    const acc_token = jwt.sign( user!, process.env.ACCESS_TOKEN!, {
                        expiresIn: '15s'
                    } )

                    if( !refresh_token_cookie ) {
                        res.setHeader( 
                            'Set-Cookie',
                            [cookies.serialize(
                                "refresh_token", refresh_token, {
                                    httpOnly: true,
                                    sameSite: "none",
                                    secure: true,
                                    maxAge: 60 * 60 * 24 * 7,
                                    path: "/"
                                } 
                                ),
                                cookies.serialize(
                                "access_token", acc_token, {
                                    httpOnly: true,
                                    sameSite: "none",
                                    secure: true,
                                    maxAge: 60 * 60 * 24 * 7,
                                    path: "/"
                                } 
                                )
                            ]                         
                        )
                    }

                    return resolve(source, user, context, info);
                } catch( e: any ) {
                    console.log( e )
                    throw new GraphQLError( e )
                }
            };
            return fieldConfig;
        }
        }
    },
    }),
};
}

const getUser: getUserFnType = async( args ) => {    

    // using findMany since findFirst fails in production 
    // for some reason
    const [ data ] = await prisma.users.findMany( {
        where: {
            email: args.email
        }
    } ) 
    
    if( !data ) throw new Error( "invalid email or password" )

    return data
}

export const { loginDirectiveTypeDefs, loginDirectiveTransformer } = loginDirective('login', getUser)