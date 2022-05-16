import { Request } from 'express';
import { IncomingHttpHeaders } from 'http';

export interface User {
  id: number;
  username: string;
  classe: string;
  level: number;
  password: string;
}

export interface UserRequest extends Request {
  headers: IncomingHttpHeaders;
  user?: User;
}