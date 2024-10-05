export interface ISendEmailPayload {
  clientEmail: string;
}
export interface ISendEmailResponse {
  msg: string;
  token: string;
}
export interface IcheckResetCodePayload {
  resetCode: number;
}

export interface IcheckResetCodeResponse {
  msg: string;
}
