import { rest } from 'msw'

export const handlers = [
  rest.get('https://jsonplaceholder.typicode.com/users', (req, res, ctx) => {

    // successful response
    return res(ctx.status(200), ctx.json(
      { hello: "Hey" }
    ), ctx.delay(30))
  })
]