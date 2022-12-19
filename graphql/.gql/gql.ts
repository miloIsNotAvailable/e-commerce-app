/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel-plugin for production.
 */
const documents = {
    "query Login($email: String!, $password: String!) {\n    login(email: $email, password: $password) {\n      email\n      password\n      username\n    }\n  }": types.LoginDocument,
    "\nquery Register($email: String!, $password: String!, $username: String!) {\n    register(email: $email, password: $password, username: $username) {\n      email\n      id\n      password\n      username\n    }\n  }": types.RegisterDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Login($email: String!, $password: String!) {\n    login(email: $email, password: $password) {\n      email\n      password\n      username\n    }\n  }"): (typeof documents)["query Login($email: String!, $password: String!) {\n    login(email: $email, password: $password) {\n      email\n      password\n      username\n    }\n  }"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nquery Register($email: String!, $password: String!, $username: String!) {\n    register(email: $email, password: $password, username: $username) {\n      email\n      id\n      password\n      username\n    }\n  }"): (typeof documents)["\nquery Register($email: String!, $password: String!, $username: String!) {\n    register(email: $email, password: $password, username: $username) {\n      email\n      id\n      password\n      username\n    }\n  }"];

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
**/
export function graphql(source: string): unknown;

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;