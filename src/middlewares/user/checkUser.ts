import { NextFunction, Response } from 'express';
import { ClientError } from '../../enums/http_status_codes';
import { UserRequest } from '../../interfaces';
import { UserService } from '../../services';

const userValidator = async (req: UserRequest, res: Response, next: NextFunction) => {
  const user = req.body;

  const userService = new UserService();

  const foundUser = await userService.findUser(user);

  if (!foundUser) {
    return res.status(ClientError.UNAUTHORIZED).json({ message: 'Username or password invalid' });
  }

  req.user = foundUser;

  next();
};

export default userValidator;