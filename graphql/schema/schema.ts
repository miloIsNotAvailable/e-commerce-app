import fs from 'fs'
import path from 'path'
import { buildSchema } from 'graphql'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { root } from '../resolvers/resolvers'
import { authDirectiveTransformer } from './directives/authDirective'
import { loginDirectiveTransformer } from './directives/auth/loginDirective'

const schemaPath = path.join( process.cwd(), "/graphql/schema/graphql-schema.graphql" )
const readSchema = fs.readFileSync( schemaPath, "utf-8" )

export const schema = buildSchema( readSchema )

let schema__ = makeExecutableSchema({
    typeDefs: schema,
    resolvers: root,
  })

// let schema_ = authDirectiveTransformer( schema__ )
let schema_ = loginDirectiveTransformer( schema__ )

export { schema_ }
