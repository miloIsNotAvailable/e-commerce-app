import { getDirective, MapperKind, mapSchema } from "@graphql-tools/utils";
import { User } from "@graphql-types";
import { defaultFieldResolver, GraphQLError, GraphQLSchema } from "graphql";
import { makeExecutableSchema } from '@graphql-tools/schema'
import { schema } from "../../schema";
import { root } from "../../../resolvers/resolvers";
import { prisma } from '../../../../prisma/client'
import { Users } from '@prisma/client'

type getUserFnType = ( args: User ) => Promise<Users | null | undefined>

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
            fieldConfig.resolve = async function (source, args, context, info) {
    
                try {
                    const user = await getUserFn( args as User );
                    
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

    const data = await prisma.users.findFirst( {
        where: {
            email: args!.email,
            password: args!.password
        }
    } ) 
    
    if( !data ) throw new Error( "invalid email or password" )

    return data
}

export const { loginDirectiveTypeDefs, loginDirectiveTransformer } = loginDirective('login', getUser)