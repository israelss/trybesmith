import jwt, { JsonWebTokenError, JwtPayload, Secret, SignOptions } from 'jsonwebtoken';
import { User } from '../interfaces';

const SECRET: Secret = process.env.JWT_SECRET || 'jwt_default_secret_trybesmith_project';
const JWT_CONFIG: SignOptions = { expiresIn: '7d', algorithm: 'HS256' };

export class AuthService {
  static generateToken = (id: number, username: string): string => {
    const token = jwt.sign({ data: { id, username } }, SECRET, JWT_CONFIG);

    return token;
  };

  static verify = (token: string | undefined): User | null => {
    if (!token) throw new Error('Token must not be null nor undefined!');

    try {
      const { data } = jwt.verify(token, SECRET) as JwtPayload;
      return data;
    } catch (error) {
      if (error instanceof JsonWebTokenError && error.message === 'jwt malformed') return null;
      console.log(error);
      throw error;
    }
  };
}

export default AuthService;