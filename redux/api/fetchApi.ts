import { Book, BooksQuery, User, LoginQuery, LoginUser } from '@graphql-types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { GraphQLClient, request } from 'graphql-request'

const requestHeaders: HeadersInit = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Credentials': "true",
}

type baseQueryType = {
    body: string
    variables: any
    headers: HeadersInit
}

const graphqlBaseQuery =
  ({ baseUrl }: { baseUrl: string } = { baseUrl: '' }): any =>
  async ({ body, variables, headers=requestHeaders }: baseQueryType) => {


    const result = await request(baseUrl, body, variables, headers );
    return { data: result };
  }

type queryType<T=unknown> = {
    body: string, 
    variables?: T
    headers?: HeadersInit
}

export const fetchApi = createApi( {
    reducerPath: 'api',
    tagTypes: [ ],
    baseQuery: graphqlBaseQuery( { 
        baseUrl: 'http://localhost:5173/api/graphiql',
    } ),
    endpoints: ( { mutation, query } ) => ({
        getHello: query<BooksQuery, queryType<Book>>( {
            providesTags: [],
            query: ( { body, variables, headers={} } ) => ( {
                url: `/graphiql`,
                method: 'POST',
                credentials: "include",
                headers: { ...requestHeaders, ...headers },
                body: body,
                variables: variables
            } )
        } ),
        getUser: query<LoginQuery, queryType<LoginUser>>( {
            providesTags: [],
            query: ( { body, variables, headers={} } ) => ( {
                url: `/graphiql`,
                method: 'POST',
                credentials: "include",
                headers: {     
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Credentials': true,
                },
                body: body,
                variables: variables
            } )
        } ),
    })
} )

export const { 
    useGetHelloQuery,
    useGetUserQuery,
    useLazyGetUserQuery
}
 = fetchApi