import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { request } from 'graphql-request'

const graphqlBaseQuery =
  ({ baseUrl }: { baseUrl: string } = { baseUrl: '' }): any =>
  async ({ body, variables }: any) => {
    const result = await request(baseUrl, body, variables);
    return { data: result };
  }

type queryType = {
    body: string, 
    variables: any
}

export const fetchApi = createApi( {
    reducerPath: 'api',
    tagTypes: [ "refresh", "category", "voted", "joined", "commented" ],
    baseQuery: graphqlBaseQuery( { 
        baseUrl: 'http://localhost:5173/api/graphql',
    } ),
    endpoints: ( { mutation, query } ) => ({
        getHello: query<any, queryType>( {
            providesTags: [],
            query: ( { body, variables } ) => ( {
                url: `/graphql`,
                method: 'POST',
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Credentials': true,
                },
                body: body,
                variables
            } )
        } ),
    })
} )

export const { 
    useGetHelloQuery,
}
 = fetchApi