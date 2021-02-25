/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: uploadImage
// ====================================================

export interface uploadImage_uploadImage {
  __typename: "CommonOutput";
  ok: boolean | null;
  error: string | null;
}

export interface uploadImage {
  uploadImage: uploadImage_uploadImage;
}

export interface uploadImageVariables {
  productId: number;
  file: any;
}
