import fs from 'fs'
import path from 'path'
import { buildSchema } from 'graphql'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { root } from '../resolvers/resolvers'
import { authDirectiveTransformer } from './directives/authDirective'
import { loginDirectiveTransformer } from './directives/auth/loginDirective'
import { registerDirectiveTransformer } from './directives/auth/registerDirective'

const schemaPath = path.join( process.cwd(), "/graphql/schema/graphql-schema.graphql" )
const readSchema = fs.readFileSync( schemaPath, "utf-8" )

export const schema = buildSchema( readSchema )

let schema__ = makeExecutableSchema({
    typeDefs: schema,
    resolvers: root,
  })

// let schema_ = authDirectiveTransformer( schema__ )
let schema_: any = loginDirectiveTransformer( schema__ )
schema_ = registerDirectiveTransformer( schema_ )

export { schema_ }
