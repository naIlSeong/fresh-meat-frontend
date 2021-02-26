/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EditProductDto } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: editProduct
// ====================================================

export interface editProduct_editProduct {
  __typename: "CommonOutput";
  ok: boolean | null;
  error: string | null;
}

export interface editProduct {
  editProduct: editProduct_editProduct;
}

export interface editProductVariables {
  input: EditProductDto;
}
