import dotenv from 'dotenv';
import { UserModel } from '../models';
import { User } from '../interfaces';
import { AuthService } from './auth';

dotenv.config();

export class UserService {
  model = new UserModel();

  public create = async (user: User): Promise<string> => {
    const id = await this.model.create(user);

    return AuthService.generateToken({ ...user, id });
  };
}

export default UserService;