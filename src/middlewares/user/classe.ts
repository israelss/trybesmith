import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { ClientError } from '../../enums/http_status_codes';

const schema = Joi.object({
  classe: Joi.string().min(3).required(),
});

const classeValidator = (req: Request, res: Response, next: NextFunction) => {
  const { classe } = req.body;

  const { error } = schema.validate({ classe });

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

export default classeValidator;