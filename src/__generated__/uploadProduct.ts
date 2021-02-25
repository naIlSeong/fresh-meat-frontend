/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UploadProductDto } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: uploadProduct
// ====================================================

export interface uploadProduct_uploadProduct {
  __typename: "UploadProductOutput";
  ok: boolean | null;
  error: string | null;
  productId: number | null;
}

export interface uploadProduct {
  uploadProduct: uploadProduct_uploadProduct;
}

export interface uploadProductVariables {
  input: UploadProductDto;
}
