/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserDetailDto } from "./globalTypes";

// ====================================================
// GraphQL query operation: userDetail
// ====================================================

export interface userDetail_userDetail_user {
  __typename: "UserObjectType";
  id: number;
  username: string;
}

export interface userDetail_userDetail_inProgress {
  __typename: "ProductObjectType";
  id: number;
  productName: string;
  bidPrice: number | null;
  remainingTime: any | null;
}

export interface userDetail_userDetail_waiting {
  __typename: "ProductObjectType";
  id: number;
  productName: string;
  startPrice: number;
}

export interface userDetail_userDetail {
  __typename: "UserDetailOutput";
  ok: boolean | null;
  error: string | null;
  user: userDetail_userDetail_user | null;
  inProgress: userDetail_userDetail_inProgress[] | null;
  waiting: userDetail_userDetail_waiting[] | null;
}

export interface userDetail {
  userDetail: userDetail_userDetail;
}

export interface userDetailVariables {
  input: UserDetailDto;
}
