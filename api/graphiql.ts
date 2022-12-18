import { expressMiddleware } from "@apollo/server/express4";
import { NextFunction, Request } from "express";
import context from "../graphql/context/context";
import { server } from "../server/build";

( async() => {
  await server.start(); 
} )()

export default ( req: Request, res: any, next: NextFunction ) => {

  (expressMiddleware(server, {
    context: context
  }))( req, res, next )
}
