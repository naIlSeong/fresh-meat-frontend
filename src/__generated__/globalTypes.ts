/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum Progress {
  Closed = "Closed",
  Completed = "Completed",
  InProgress = "InProgress",
  Paid = "Paid",
  Waiting = "Waiting",
}

export interface CreateBiddingDto {
  productId: number;
  startPrice: number;
}

export interface CreateUserDto {
  username: string;
  email: string;
  password: string;
}

export interface DeleteProductDto {
  productId: number;
}

export interface DeleteUserDto {
  password: string;
}

export interface EditProgressDto {
  productId: number;
}

export interface GetAllProductsDto {
  page?: number | null;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface ProductDetailDto {
  productId: number;
}

export interface UpdateBiddingDto {
  productId: number;
  bidPrice: number;
}

export interface UpdateUserDto {
  username?: string | null;
  email?: string | null;
  password?: string | null;
}

export interface UploadProductDto {
  productName?: string | null;
  description?: string | null;
  startPrice?: number | null;
}

export interface UserDetailDto {
  userId: number;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
