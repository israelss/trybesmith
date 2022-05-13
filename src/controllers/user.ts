import { Response, Request } from 'express';
import { Success } from '../enums/http_status_codes';
import { UserService } from '../services';

export class UserController {
  service = new UserService();

  public create = async (req: Request, res: Response): Promise<Response> => {
    const user = req.body;
    const token = await this.service.create(user);
    return res.status(Success.CREATED).json({ token });
  };
}

export default UserController;