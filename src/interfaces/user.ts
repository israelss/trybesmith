import { Request } from 'express';

export interface User {
  id: number;
  username: string;
  classe: string;
  level: number;
  password: string;
}

export interface UserRequest extends Request {
  user?: User;
}