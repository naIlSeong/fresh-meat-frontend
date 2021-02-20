/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateBiddingDto } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: updateBidding
// ====================================================

export interface updateBidding_updateBidding {
  __typename: "CommonOutput";
  ok: boolean | null;
  error: string | null;
}

export interface updateBidding {
  updateBidding: updateBidding_updateBidding;
}

export interface updateBiddingVariables {
  input: UpdateBiddingDto;
}
