export interface User {
    fullname?: string;
    lastname?: string;
    email: string;
    password: string;
    id?: string;
    success?:boolean;
    message?:string;
  }