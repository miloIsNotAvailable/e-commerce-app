import fs from 'fs'
import path from 'path'
import express from 'express'
import { createServer as createViteServer } from 'vite'
import cookies from 'cookie-parser'
import glob from 'glob'
import bodyParser from 'body-parser'
import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import http from 'http';
import cors from 'cors';
import { json } from 'body-parser';
import context from './graphql/context/context'

const typeDefs = `#graphql

  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.


  # This "Book" type defines the queryable fields for every book in our data source.

  type Book {

    title: String

    author: String

  }


  # The "Query" type is special: it lists all of the available queries that

  # clients can execute, along with the return type for each. In this

  # case, the "books" query returns an array of zero or more Books (defined above).

  type Query {

    books: [Book]

  }
`;

const books = [
  {
    title: 'The Awakening',
    author: 'Kate Chopin',
  },

  {
    title: 'City of Glass',
    author: 'Paul Auster',

  },
];

const resolvers = {
  Query: {
    books: () => books,
  },
};

async function createServer() {
  const app = express()
  const httpServer = http.createServer( app )
  
  const server = new ApolloServer<{ token: string }>({
    typeDefs,  
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }))
  const publicDirectoryPath = path.join(__dirname, '../public/')
  app.use(express.static(publicDirectoryPath))
  
  // parse application/json
  app.use(bodyParser.json( { limit: '50mb' } ))

  // Create Vite server in middleware mode and configure the app type as
  // 'custom', disabling Vite's own HTML serving logic so parent server
  // can take control
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'custom'
  })

  // use vite's connect instance as middleware
  // if you use your own express router (express.Router()), you should use router.use
  app.use(vite.middlewares)
  app.use( cookies() )

  let e = glob.sync( "./api/**/*.ts" )

  const imports = e.map( async n => await import( n.replace( ".ts", "" ) ) )
  imports.forEach( async ( n, ind ) => {
    
    const api_name = e[ind]
    .replace( ".ts", "" )
    .replace( "./api/", "/api/" )
    
    app.use( api_name, async( req, res, next ) => {
      const func = await n
      func.default( req, res, next )
    } )
  } )

  await server.start();
  
  app.use(
    "/api/graphiql",

    cors<cors.CorsRequest>(),
    json(),
    expressMiddleware(server as any, {
      context: context
    })
  );
  
  app.use('*', async (req, res, next) => {
    const url = req.originalUrl
  
    try {

      const url_ = req.originalUrl
      .replace( /\/(?=.)/, "" )
      .replace( /\/(?!.)/, "index" )

      // 1. Read index.html
      let template = fs.readFileSync(
        path.resolve(process.cwd(), `${ "index" }.html`),
        'utf-8'
      )
  
      // 2. Apply Vite HTML transforms. This injects the Vite HMR client, and
      //    also applies HTML transforms from Vite plugins, e.g. global preambles
      //    from @vitejs/plugin-react
      template = await vite.transformIndexHtml(url, template)

      // 3. Load the server entry. vite.ssrLoadModule automatically transforms
      //    your ESM source code to be usable in Node.js! There is no bundling
      //    required, and provides efficient invalidation similar to HMR.
      const { render } = await vite.ssrLoadModule('src/render.tsx')
  
      // 4. render the app HTML. This assumes entry-server.js's exported `render`
      //    function calls appropriate framework SSR APIs,
      //    e.g. ReactDOMServer.renderToString()
      const appHtml = await render(url)
        
      const preload_css = glob.sync( "./styles/**/*.css" )
      .map( file => `<link rel="stylesheet preload prefetch" href="${ file.replace( "./", "/" ) }" as="style"/>` )
      .join( "\n" )

      // 5. Inject the app-rendered HTML into the template.
      const html = template
      .replace(`<!--ssr-outlet-->`, appHtml)
      .replace( '<!-- preload-css -->', preload_css )

      // 6. Send the rendered HTML back.
      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      // If an error is caught, let Vite fix the stack trace so it maps back to
      // your actual source code.
      vite.ssrFixStacktrace(e as any)
      next(e)
    }
  })
    
  const PORT = 5173 || process.env.PORT
  await new Promise<void>((resolve) => httpServer.listen({ port: PORT }, resolve));
  
  console.log(`🚀✨ Server ready at http://localhost:${PORT}`);
  // app.listen(PORT, () => console.log( `✨ app is running on http://localhost:${ PORT }` ))
}

createServer()
