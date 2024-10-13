export interface ICreateTeacherPayload {
  fullName: string;
  phone: string;
}
export interface ICreateTeacherResponse {
  msg: string;
  data: Data;
}

export interface Data {
  id: number;
  fullName: string;
  phone: string;
}
export interface IUpdateTeacherPayload {
  phone: string;
  fullName: string;
}
export interface IUpdateTeacherResponse {
  msg: string;
  data: Data;
}

export interface Data {
  id: number;
  fullName: string;
  phone: string;
}
export interface IListTeacherResult {
  msg: string;
  data: result[];
}

export interface result {
  id: number;
  fullName: string;
  phone: string;
}
