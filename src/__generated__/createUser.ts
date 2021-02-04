/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateUserDto } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: createUser
// ====================================================

export interface createUser_createUser {
  __typename: "CommonOutput";
  ok: boolean | null;
  error: string | null;
}

export interface createUser {
  createUser: createUser_createUser;
}

export interface createUserVariables {
  input: CreateUserDto;
}
