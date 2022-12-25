import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
    schema: 'http://localhost:6173/api/graphiql',
    documents: ['./**/*.tsx'],
    generates: {
      './graphql/.gql/': {
        preset: 'client',
        plugins: []
      }
    }
  }
   
  export default config