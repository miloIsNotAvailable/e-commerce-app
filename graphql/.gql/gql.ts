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
    "query GetItems($category: ItemCategories!) {\n    getItems(category: $category) {\n      id\n      category\n      desc\n      img\n      title\n    }\n  }": types.GetItemsDocument,
    "mutation CreateReview(\n    $text: String!\n    $createReviewId: String\n    $author: String\n    $createdAt: String\n    $itemId: String!\n  ) {\n    createReview(\n      text: $text\n      id: $createReviewId\n      author: $author\n      created_at: $createdAt\n      item_id: $itemId\n    ) {\n      author\n      created_at\n      id\n      text\n      item_id\n    }\n  }\n  ": types.CreateReviewDocument,
    "mutation NewItem($title: String!, $img: String!, $desc: String, $category: ItemCategories!) {\n    newItem(title: $title, img: $img, desc: $desc, category: $category) {\n      category\n      desc\n      img\n      title\n    }\n  }": types.NewItemDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetItems($category: ItemCategories!) {\n    getItems(category: $category) {\n      id\n      category\n      desc\n      img\n      title\n    }\n  }"): (typeof documents)["query GetItems($category: ItemCategories!) {\n    getItems(category: $category) {\n      id\n      category\n      desc\n      img\n      title\n    }\n  }"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CreateReview(\n    $text: String!\n    $createReviewId: String\n    $author: String\n    $createdAt: String\n    $itemId: String!\n  ) {\n    createReview(\n      text: $text\n      id: $createReviewId\n      author: $author\n      created_at: $createdAt\n      item_id: $itemId\n    ) {\n      author\n      created_at\n      id\n      text\n      item_id\n    }\n  }\n  "): (typeof documents)["mutation CreateReview(\n    $text: String!\n    $createReviewId: String\n    $author: String\n    $createdAt: String\n    $itemId: String!\n  ) {\n    createReview(\n      text: $text\n      id: $createReviewId\n      author: $author\n      created_at: $createdAt\n      item_id: $itemId\n    ) {\n      author\n      created_at\n      id\n      text\n      item_id\n    }\n  }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation NewItem($title: String!, $img: String!, $desc: String, $category: ItemCategories!) {\n    newItem(title: $title, img: $img, desc: $desc, category: $category) {\n      category\n      desc\n      img\n      title\n    }\n  }"): (typeof documents)["mutation NewItem($title: String!, $img: String!, $desc: String, $category: ItemCategories!) {\n    newItem(title: $title, img: $img, desc: $desc, category: $category) {\n      category\n      desc\n      img\n      title\n    }\n  }"];

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