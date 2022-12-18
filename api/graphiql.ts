import { expressMiddleware } from "@apollo/server/express4";
import { NextFunction, Request } from "express";
import context from "../graphql/context/context";
import { server } from "../server/build";

( async() => {
  await server.start(); 
} )()

export default ( req: Request, res: any, next: NextFunction ) => {

  res.set( {
    'Content-Type': "application/json"
  } )

  (expressMiddleware(server, {
    context: context
  }))( req, res, next )
}
