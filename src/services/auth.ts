import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import { User } from '../interfaces';

const SECRET: Secret = process.env.JWT_SECRET || 'jwt_default_secret_trybesmith_project';
const JWT_CONFIG: SignOptions = { expiresIn: '7d', algorithm: 'HS256' };

export class AuthService {
  static generateToken = (user: User): string => {
    const { id, username } = user;
    const token = jwt.sign({ data: { id, username } }, SECRET, JWT_CONFIG);

    return token;
  };
}

export default AuthService;