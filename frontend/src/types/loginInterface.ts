export interface ILoginPayload {
  username: string;
  password: string;
}
export interface ILoginResponse {
  msg: string;
  phone: string;
  accessToken: string;
  refreshToken: string;
}
