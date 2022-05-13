import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { ClientError } from '../../enums/http_status_codes';

const schema = Joi.object({
  level: Joi.number().min(1).required(),
});

const levelValidator = (req: Request, res: Response, next: NextFunction) => {
  const { level } = req.body;

  const { error } = schema.validate({ level });

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

export default levelValidator;