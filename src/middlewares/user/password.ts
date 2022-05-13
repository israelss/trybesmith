import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { ClientError } from '../../enums/http_status_codes';

const schema = Joi.object({
  password: Joi.string().min(8).required(),
});

const passwordValidator = (req: Request, res: Response, next: NextFunction) => {
  const { password } = req.body;

  const { error } = schema.validate({ password });

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

export default passwordValidator;