import dotenv from 'dotenv';
import jwt, { Secret } from 'jsonwebtoken';
import { UserModel } from '../models';
import { User } from '../interfaces';

dotenv.config();

const SECRET: Secret = process.env.JWT_SECRET || '';

export class UserService {
  model = new UserModel();

  public create = async (user: User): Promise<string> => {
    await this.model.create(user);

    const token = jwt.sign({
      data: {
        username: user.username,
        classe: user.classe,
        level: user.level,
      },
    }, SECRET, {
      expiresIn: '7d',
      algorithm: 'HS256',
    });

    return token;
  };
}

export default UserService;