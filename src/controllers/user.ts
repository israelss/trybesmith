import { Response, Request } from 'express';
import { ClientError, Success } from '../enums/http_status_codes';
import { UserRequest } from '../interfaces';
import { AuthService, UserService } from '../services';

export class UserController {
  service = new UserService();

  public create = async (req: Request, res: Response): Promise<Response> => {
    const user = req.body;
    const token = await this.service.create(user);
    return res.status(Success.CREATED).json({ token });
  };

  public login = async (req: UserRequest, res: Response): Promise<Response> => {
    const { user } = req;
    if (user) {
      const { id, username } = user;
      const token = AuthService.generateToken(id, username);
      return res.status(Success.OK).json({ token });
    }
    return res.status(ClientError.UNAUTHORIZED).json({ message: 'User not found!' });
  };
}

export default UserController;