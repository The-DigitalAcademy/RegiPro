export interface user {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  id: string;
  success:boolean;
  message:string;
  accessToken:string;
}
export interface reset{
  email : string;
  password: string;
}
