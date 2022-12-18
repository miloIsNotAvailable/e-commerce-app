import { getDirective, MapperKind, mapSchema } from "@graphql-tools/utils";
import { defaultFieldResolver, GraphQLError, GraphQLSchema } from "graphql";
import { prisma } from '../../../../prisma/client'
import { Users } from '@prisma/client'

type getUserFnType = ( args: Users ) => Promise<Users | null | undefined>

export default function registerDirective(
directiveName: string,
getUserFn: getUserFnType
) {
const typeDirectiveArgumentMaps: Record<string, any> = {};

return {
registerDirectiveTypeDefs: `directive @${directiveName} (
    email: String!
    password: String!
  ) on OBJECT | FIELD_DEFINITION`,
registerDirectiveTransformer: (schema: GraphQLSchema) =>
    mapSchema(schema, {
    [MapperKind.TYPE]: (type) => {
        const registerDirective = getDirective(schema, type, directiveName)?.[0];
        if (registerDirective) {
        typeDirectiveArgumentMaps[type.name] = registerDirective;
        }
        return undefined;
    },
    [MapperKind.OBJECT_FIELD]: (fieldConfig, _fieldName, typeName) => {
        const registerDirective =
        getDirective(schema, fieldConfig, directiveName)?.[0] ??
        typeDirectiveArgumentMaps[typeName];
        if (registerDirective) {
        const { requires } = registerDirective;
        if (requires) {
            const { resolve = defaultFieldResolver } = fieldConfig;
            fieldConfig.resolve = async function (source, args, context, info) {
    
                try {
                    const user = await getUserFn( args );
                    
                    if( !user ) throw new Error( "unexpected error occured" ) 

                    return resolve(source, user, context, info);
                } catch( e: any ) {
                    console.log( e?.message )
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

    const data = await prisma.users.create( {
        data: {
            email: args.email,
            password: args.password,
            username: args.username
        }
    } ) 

    // const data: Users = {
    //     id: "1",
    //     username: "hi",
    //     password: "hey",
    //     email: "hello",
    //     created_at: new Date()
    // }

    return data
}

export const { registerDirectiveTypeDefs, registerDirectiveTransformer } = registerDirective('register', getUser)