export interface IUser {
  email: string;
  id: number;
  last_name: string;
  first_name: string;
  avatar: string;
}
export interface UserListApiResponse {
  data: IUser[];
}
export interface SingleUserResponse {
  data: IUser;
}

export interface FormLogin {
  email: string;
  password: string;
}
// export interface CreateUserResponse{
//     user:IUser,
//     status:string;
// }
