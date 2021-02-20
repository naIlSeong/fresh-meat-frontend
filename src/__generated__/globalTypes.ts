/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export interface CreateBiddingDto {
  productId: number;
  startPrice: number;
}

export interface CreateUserDto {
  username: string;
  email: string;
  password: string;
}

export interface GetAllProductsDto {
  page?: number | null;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface UpdateBiddingDto {
  productId: number;
  bidPrice: number;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
