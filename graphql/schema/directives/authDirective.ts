import { getDirective, MapperKind, mapSchema } from "@graphql-tools/utils";
import { User } from "@graphql-types";
import { defaultFieldResolver, GraphQLError, GraphQLSchema } from "graphql";
import { makeExecutableSchema } from '@graphql-tools/schema'
import { schema } from "../schema";
import { root } from "../../resolvers/resolvers";
import jwt from 'jsonwebtoken'

type getUserFnType = () => string

export default function authDirective(
directiveName: string,
getUserFn: getUserFnType
) {
const typeDirectiveArgumentMaps: Record<string, any> = {};

return {
authDirectiveTypeDefs: `directive @${directiveName}(
        requires: Role = USER,
    ) on OBJECT | FIELD_DEFINITION
    
    enum Role {
        USER
        UNKNOWN
    }`,
authDirectiveTransformer: (schema: GraphQLSchema) =>
    mapSchema(schema, {
    [MapperKind.TYPE]: (type) => {
        const authDirective = getDirective(schema, type, directiveName)?.[0];
        if (authDirective) {
        typeDirectiveArgumentMaps[type.name] = authDirective;
        }
        return undefined;
    },
    [MapperKind.OBJECT_FIELD]: (fieldConfig, _fieldName, typeName) => {
        const authDirective =
        getDirective(schema, fieldConfig, directiveName)?.[0] ??
        typeDirectiveArgumentMaps[typeName];
        if (authDirective) {
        const { requires } = authDirective;
        if (requires) {
            const { resolve = defaultFieldResolver } = fieldConfig;
            fieldConfig.resolve = async function (source, args, context, info) {
                
                const { user } = context
                if( !user ) throw new Error( "user not authorized" )

                return resolve(source, args, context, info);
            };
            return fieldConfig;
        }
        }
    },
    }),
};
}

export function getUser() {
    console.log( "ye" )
    return "USER"
}

export const { authDirectiveTypeDefs, authDirectiveTransformer } = authDirective('auth', getUser)