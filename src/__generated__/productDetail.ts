/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ProductDetailDto, Progress } from "./globalTypes";

// ====================================================
// GraphQL query operation: productDetail
// ====================================================

export interface productDetail_productDetail_product_seller {
  __typename: "UserObjectType";
  id: number;
  username: string;
}

export interface productDetail_productDetail_product_bidder {
  __typename: "UserObjectType";
  id: number;
  username: string;
}

export interface productDetail_productDetail_product {
  __typename: "ProductObjectType";
  id: number;
  productName: string;
  startPrice: number;
  bidPrice: number | null;
  seller: productDetail_productDetail_product_seller;
  bidder: productDetail_productDetail_product_bidder | null;
  progress: Progress;
}

export interface productDetail_productDetail {
  __typename: "ProductDetailOutput";
  ok: boolean | null;
  error: string | null;
  product: productDetail_productDetail_product | null;
}

export interface productDetail {
  productDetail: productDetail_productDetail;
}

export interface productDetailVariables {
  input: ProductDetailDto;
}
