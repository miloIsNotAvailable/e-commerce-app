import {
  Book,
  LoginQuery,
  LoginQueryVariables,
  LoginUser,
  RegisterQuery,
  RegisterQueryVariables,
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

export const fetchApi = createApi({
  reducerPath: "api",
  tagTypes: [],
  baseQuery: graphqlBaseQuery({
    baseUrl: "/api/graphiql",
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
    getUser: query<LoginQuery, queryType<LoginQueryVariables>>({
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
    createUser: mutation<RegisterQuery, queryType<RegisterQueryVariables>>({
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
    useCreateUserMutation
} = fetchApi;
