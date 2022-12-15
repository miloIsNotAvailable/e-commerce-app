import { ExpressContextFunctionArgument } from '@apollo/server/express4'

export default async function context ({ req }: ExpressContextFunctionArgument ) {
    return { token: req.headers.token }
}