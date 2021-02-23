/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Progress } from "./globalTypes";

// ====================================================
// GraphQL query operation: myProfile
// ====================================================

export interface myProfile_myProfile_uploadedProduct {
  __typename: "Product";
  id: number;
  productName: string;
  bidPrice: number | null;
  progress: Progress;
}

export interface myProfile_myProfile_inProgressProduct {
  __typename: "Product";
  id: number;
  productName: string;
  bidPrice: number | null;
  remainingTime: any | null;
}

export interface myProfile_myProfile_closedProduct {
  __typename: "Product";
  id: number;
  productName: string;
  bidPrice: number | null;
}

export interface myProfile_myProfile_paidProduct {
  __typename: "Product";
  id: number;
  productName: string;
  bidPrice: number | null;
}

export interface myProfile_myProfile_completedProduct {
  __typename: "Product";
  id: number;
  productName: string;
  bidPrice: number | null;
}

export interface myProfile_myProfile {
  __typename: "MyProfileOutput";
  ok: boolean | null;
  error: string | null;
  uploadedProduct: myProfile_myProfile_uploadedProduct[] | null;
  inProgressProduct: myProfile_myProfile_inProgressProduct[] | null;
  closedProduct: myProfile_myProfile_closedProduct[] | null;
  paidProduct: myProfile_myProfile_paidProduct[] | null;
  completedProduct: myProfile_myProfile_completedProduct[] | null;
}

export interface myProfile {
  myProfile: myProfile_myProfile;
}
