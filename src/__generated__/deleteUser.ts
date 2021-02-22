/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DeleteUserDto } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: deleteUser
// ====================================================

export interface deleteUser_deleteUser {
  __typename: "CommonOutput";
  ok: boolean | null;
  error: string | null;
}

export interface deleteUser {
  deleteUser: deleteUser_deleteUser;
}

export interface deleteUserVariables {
  input: DeleteUserDto;
}
