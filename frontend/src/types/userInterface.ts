export interface IUserListResult {
  msg: string;
  data: userResult[];
}

export interface userResult {
  id: number;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  phone: string;
  role: string;
}
export interface UpdateRoleInterface {
  phone: string;
  role: string;
}
export interface updateRoleResponse {
  msg: string;
  user: User;
}

export interface User {
  id: number;
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}
