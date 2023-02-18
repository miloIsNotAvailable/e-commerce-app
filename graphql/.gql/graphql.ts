/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Book = {
  __typename?: 'Book';
  author?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export enum ItemCategories {
  Art = 'ART',
  Beds = 'BEDS',
  Chairs = 'CHAIRS',
  Shelves = 'SHELVES',
  Tables = 'TABLES'
}

export type Mutation = {
  __typename?: 'Mutation';
  createReview?: Maybe<Review>;
  newItem?: Maybe<CreateItem>;
};


export type MutationCreateReviewArgs = {
  author?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  item_id: Scalars['String'];
  text: Scalars['String'];
};


export type MutationNewItemArgs = {
  category: ItemCategories;
  desc?: InputMaybe<Scalars['String']>;
  img: Scalars['String'];
  title: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  books?: Maybe<Array<Maybe<Book>>>;
  getItem?: Maybe<CreateItem>;
  getItems?: Maybe<Array<Maybe<CreateItem>>>;
  getReviews?: Maybe<Array<Review>>;
  hello?: Maybe<Scalars['String']>;
  login?: Maybe<LoginUser>;
  register?: Maybe<RegisterUser>;
  user?: Maybe<User>;
};


export type QueryGetItemArgs = {
  id: Scalars['String'];
};


export type QueryGetItemsArgs = {
  category: ItemCategories;
};


export type QueryGetReviewsArgs = {
  item_id: Scalars['String'];
};


export type QueryLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type QueryRegisterArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export enum Role {
  Unknown = 'UNKNOWN',
  User = 'USER'
}

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type CreateItem = {
  __typename?: 'createItem';
  category: ItemCategories;
  desc?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  img: Scalars['String'];
  reviews?: Maybe<Array<Maybe<Review>>>;
  title: Scalars['String'];
};

export type LoginUser = {
  __typename?: 'loginUser';
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type RegisterUser = {
  __typename?: 'registerUser';
  email: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  password: Scalars['String'];
  username: Scalars['String'];
};

export type Review = {
  __typename?: 'review';
  author?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  item_id: Scalars['String'];
  text: Scalars['String'];
};

export type GetItemsQueryVariables = Exact<{
  category: ItemCategories;
}>;


export type GetItemsQuery = { __typename?: 'Query', getItems?: Array<{ __typename?: 'createItem', id?: string | null, category: ItemCategories, desc?: string | null, img: string, title: string } | null> | null };

export type GetItemQueryVariables = Exact<{
  getItemId: Scalars['String'];
}>;


export type GetItemQuery = { __typename?: 'Query', getItem?: { __typename?: 'createItem', category: ItemCategories, desc?: string | null, id?: string | null, title: string, img: string, reviews?: Array<{ __typename?: 'review', author?: string | null, created_at?: string | null, item_id: string, id?: string | null, text: string } | null> | null } | null };

export type GetReviewsQueryVariables = Exact<{
  itemId: Scalars['String'];
}>;


export type GetReviewsQuery = { __typename?: 'Query', getReviews?: Array<{ __typename?: 'review', author?: string | null, id?: string | null, text: string }> | null };

export type CreateReviewMutationVariables = Exact<{
  text: Scalars['String'];
  createReviewId?: InputMaybe<Scalars['String']>;
  author?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['String']>;
  itemId: Scalars['String'];
}>;


export type CreateReviewMutation = { __typename?: 'Mutation', createReview?: { __typename?: 'review', author?: string | null, created_at?: string | null, id?: string | null, text: string, item_id: string } | null };

export type NewItemMutationVariables = Exact<{
  title: Scalars['String'];
  img: Scalars['String'];
  desc?: InputMaybe<Scalars['String']>;
  category: ItemCategories;
}>;


export type NewItemMutation = { __typename?: 'Mutation', newItem?: { __typename?: 'createItem', category: ItemCategories, desc?: string | null, img: string, title: string } | null };


export const GetItemsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetItems"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"category"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ItemCategories"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getItems"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"category"},"value":{"kind":"Variable","name":{"kind":"Name","value":"category"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"desc"}},{"kind":"Field","name":{"kind":"Name","value":"img"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]} as unknown as DocumentNode<GetItemsQuery, GetItemsQueryVariables>;
export const GetItemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetItem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"getItemId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getItem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"getItemId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"desc"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"img"}},{"kind":"Field","name":{"kind":"Name","value":"reviews"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"author"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"item_id"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}}]}}]}}]}}]} as unknown as DocumentNode<GetItemQuery, GetItemQueryVariables>;
export const GetReviewsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetReviews"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"itemId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getReviews"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"item_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"itemId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"author"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}}]}}]}}]} as unknown as DocumentNode<GetReviewsQuery, GetReviewsQueryVariables>;
export const CreateReviewDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateReview"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"text"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createReviewId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"author"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createdAt"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"itemId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createReview"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"text"},"value":{"kind":"Variable","name":{"kind":"Name","value":"text"}}},{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createReviewId"}}},{"kind":"Argument","name":{"kind":"Name","value":"author"},"value":{"kind":"Variable","name":{"kind":"Name","value":"author"}}},{"kind":"Argument","name":{"kind":"Name","value":"created_at"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createdAt"}}},{"kind":"Argument","name":{"kind":"Name","value":"item_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"itemId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"author"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"item_id"}}]}}]}}]} as unknown as DocumentNode<CreateReviewMutation, CreateReviewMutationVariables>;
export const NewItemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"NewItem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"title"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"img"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"desc"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"category"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ItemCategories"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"newItem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"title"},"value":{"kind":"Variable","name":{"kind":"Name","value":"title"}}},{"kind":"Argument","name":{"kind":"Name","value":"img"},"value":{"kind":"Variable","name":{"kind":"Name","value":"img"}}},{"kind":"Argument","name":{"kind":"Name","value":"desc"},"value":{"kind":"Variable","name":{"kind":"Name","value":"desc"}}},{"kind":"Argument","name":{"kind":"Name","value":"category"},"value":{"kind":"Variable","name":{"kind":"Name","value":"category"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"desc"}},{"kind":"Field","name":{"kind":"Name","value":"img"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]} as unknown as DocumentNode<NewItemMutation, NewItemMutationVariables>;