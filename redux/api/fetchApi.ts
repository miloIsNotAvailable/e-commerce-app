import {
  Book,
  LoginUser,
  NewItemMutation,
  NewItemMutationVariables,
  QueryLoginArgs,
  QueryRegisterArgs,
  RegisterUser,
  
} from "@graphql-types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GraphQLClient, request } from "graphql-request";

const requestHeaders: HeadersInit = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Credentials": "true",
};

type baseQueryType = {
  body: string;
  variables: any;
  headers: HeadersInit;
};

const graphqlBaseQuery =
  ({ baseUrl }: { baseUrl: string } = { baseUrl: "" }): any =>
  async ({ body, variables, headers = requestHeaders }: baseQueryType) => {
    const result = await request(baseUrl, body, variables, headers);
    return { data: result };
  };

type queryType<T = unknown> = {
  body: string;
  variables?: T;
  headers?: any;
};

function areWeTestingWithJest() {
    if( typeof window === "undefined" ) return "/api/graphiql"
    if( typeof process !== "undefined" && process.env.JEST_WORKER_ID !== undefined ) 
        return 'http://localhost:5173/api/graphiql'
    
    return "/api/graphiql" 
}

export const fetchApi = createApi({
  reducerPath: "api",
  tagTypes: [],
  baseQuery: graphqlBaseQuery({
    baseUrl: areWeTestingWithJest(),
  }),
  endpoints: ({ mutation, query }) => ({
    getHello: query<any, queryType<Book>>({
      providesTags: [],
      query: ({ body, variables, headers = {} }) => ({
        url: `/graphiql`,
        method: "POST",
        credentials: "include",
        headers: { ...requestHeaders, ...headers },
        body: body,
        variables: variables,
      }),
    }),
    getUser: query<LoginUser, queryType<QueryLoginArgs>>({
      providesTags: [],
      query: ({ body, variables, headers = {} }) => ({
        url: `/graphiql`,
        method: "POST",
        credentials: "include",
        headers: { ...requestHeaders, ...headers },
        body: body,
        variables: variables,
      }),
    }),
    createUser: mutation<RegisterUser, queryType<QueryRegisterArgs>>({
      query: ({ body, variables, headers = {} }) => ({
        url: `/graphiql`,
        method: "POST",
        credentials: "include",
        headers: { ...requestHeaders, ...headers },
        body: body,
        variables: variables,
      }),
    }),
    newItem: mutation<NewItemMutation, queryType<Partial<NewItemMutationVariables>>>({
      query: ({ body, variables, headers = {} }) => ({
        url: `/graphiql`,
        method: "POST",
        credentials: "include",
        headers: { ...requestHeaders, ...headers },
        body: body,
        variables: variables,
      }),
    }),
  }),
});

export const { 
    useGetHelloQuery, 
    useGetUserQuery, 
    useLazyGetUserQuery,
    useCreateUserMutation,
    useNewItemMutation
} = fetchApi;
