import { Time } from "@angular/common";

export interface IAuthenticate {
  username: string;
  password: string;
}
export interface IRegister {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface IUser {
  accessToken: string;
  expireDate: Date;
  expireTime: Time;
  message: string;
  profilePicture: string;
  refreshToken: IRefreshToken;
  tokenLifeTime: number;
  userId: string;
  userName: string;
  
}
export interface IRefreshToken {
  createdByIp: string;
  createdOn: Date;
  expiryOn: Date;
  id: number;
  revokedByIp: string;
  revokedOn: Date;
  token: string;
  userId: string;
}
export interface AuthApiResponse {
  success: boolean;
  isSuccess: boolean;
  statusCode: boolean;
  message: string;
  data: object;
  recordsEffected: number;
  totalRecords: number;
}
