/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EditProgressDto } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: editProgress
// ====================================================

export interface editProgress_editProgress {
  __typename: "CommonOutput";
  ok: boolean | null;
  error: string | null;
}

export interface editProgress {
  editProgress: editProgress_editProgress;
}

export interface editProgressVariables {
  input: EditProgressDto;
}
