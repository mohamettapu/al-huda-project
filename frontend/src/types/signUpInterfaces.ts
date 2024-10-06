export interface ISignUpPayload {
  username: string;
  password: string;
  firstname: string;
  lastname: string;
  phone: string;
  email: string;
}
export interface ISignUpResponse {
  msg: string;
  data: Data;
}

export interface Data {
  id: number;
  username: string;
  email: string;
  firstname: string;
  lastname: string;
  phone: string;
}
