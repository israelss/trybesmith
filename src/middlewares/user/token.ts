import { NextFunction, Response } from 'express';
import { ClientError } from '../../enums/http_status_codes';
import { UserRequest } from '../../interfaces';
import { AuthService } from '../../services';

const tokenValidator = async (req: UserRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) return res.status(ClientError.UNAUTHORIZED).json({ message: 'Token not found' });

  try {
    const userData = AuthService.verify(token);
    if (!userData) return res.status(ClientError.UNAUTHORIZED).json({ message: 'Invalid token' });
    req.user = userData;
    return next();
  } catch (error) {
    console.log({ error });
    return res.status(ClientError.UNAUTHORIZED).json({ message: 'Invalid token' });
  }
};

export default tokenValidator;