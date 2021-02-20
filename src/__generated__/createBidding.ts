/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateBiddingDto } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: createBidding
// ====================================================

export interface createBidding_createBidding {
  __typename: "CommonOutput";
  ok: boolean | null;
  error: string | null;
}

export interface createBidding {
  createBidding: createBidding_createBidding;
}

export interface createBiddingVariables {
  input: CreateBiddingDto;
}
