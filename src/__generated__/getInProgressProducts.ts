/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetAllProductsDto } from "./globalTypes";

// ====================================================
// GraphQL query operation: getInProgressProducts
// ====================================================

export interface getInProgressProducts_getInProgressProducts_products_pictures {
  __typename: "File";
  url: string;
}

export interface getInProgressProducts_getInProgressProducts_products {
  __typename: "Product";
  id: number;
  productName: string;
  description: string | null;
  bidPrice: number | null;
  remainingTime: any | null;
  pictures: getInProgressProducts_getInProgressProducts_products_pictures[];
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
