import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { ClientError } from '../../enums/http_status_codes';

const schema = Joi.object({
  username: Joi.string().min(3).required(),
});

const usernameValidator = (req: Request, res: Response, next: NextFunction) => {
  const { username } = req.body;

  const { error } = schema.validate({ username });

  if (error) {
    const [details] = error.details;
    const { type, message } = details;

    if (type === 'any.required') {
      return res.status(ClientError.BAD_REQUEST).json({ message });
    }

    return res.status(ClientError.UNPROCESSABLE_ENTITY).json({ message });
  }

  next();
};

export default usernameValidator;