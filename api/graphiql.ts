import { expressMiddleware } from "@apollo/server/express4";
import context from "../graphql/context/context";
import { server } from "../server/build";

export default expressMiddleware(server, {
    context: context
  })
