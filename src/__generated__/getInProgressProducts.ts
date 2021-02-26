/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetAllProductsDto } from "./globalTypes";

// ====================================================
// GraphQL query operation: getInProgressProducts
// ====================================================

export interface getInProgressProducts_getInProgressProducts_products_picture {
  __typename: "FileObjectType";
  url: string;
}

export interface getInProgressProducts_getInProgressProducts_products {
  __typename: "ProductObjectType";
  id: number;
  productName: string;
  description: string | null;
  bidPrice: number | null;
  remainingTime: any | null;
  picture: getInProgressProducts_getInProgressProducts_products_picture | null;
}

export interface getInProgressProducts_getInProgressProducts {
  __typename: "GetAllProductsOutput";
  ok: boolean | null;
  error: string | null;
  maxPage: number | null;
  products: getInProgressProducts_getInProgressProducts_products[] | null;
}

export interface getInProgressProducts {
  getInProgressProducts: getInProgressProducts_getInProgressProducts;
}

export interface getInProgressProductsVariables {
  input: GetAllProductsDto;
}
