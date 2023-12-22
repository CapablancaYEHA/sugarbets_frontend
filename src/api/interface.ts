export interface IUserLoginRequest {
  pass: string;
  mail: string;
}
export interface IUserRegisterRequest extends IUserLoginRequest {
  name: string;
}
