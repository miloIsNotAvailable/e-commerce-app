import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: "@graphql-types", replacement: path.resolve( __dirname, 'graphql/.gql/graphql.ts' ) }
    ]
  }
})
