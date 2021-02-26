/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetAllProductsDto } from "./globalTypes";

// ====================================================
// GraphQL query operation: getWaitingProducts
// ====================================================

export interface getWaitingProducts_getWaitingProducts_products_picture {
  __typename: "FileObjectType";
  url: string;
}

export interface getWaitingProducts_getWaitingProducts_products {
  __typename: "ProductObjectType";
  id: number;
  productName: string;
  description: string | null;
  startPrice: number;
  remainingTime: any | null;
  picture: getWaitingProducts_getWaitingProducts_products_picture | null;
}

export interface getWaitingProducts_getWaitingProducts {
  __typename: "GetAllProductsOutput";
  ok: boolean | null;
  error: string | null;
  maxPage: number | null;
  products: getWaitingProducts_getWaitingProducts_products[] | null;
}

export interface getWaitingProducts {
  getWaitingProducts: getWaitingProducts_getWaitingProducts;
}

export interface getWaitingProductsVariables {
  input: GetAllProductsDto;
}
