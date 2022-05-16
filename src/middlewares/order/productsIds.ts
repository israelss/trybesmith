import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { ClientError } from '../../enums/http_status_codes';

const schema = Joi.object({
  productsIds: Joi.array().items(Joi.number().required()).required(),
});

const productsIdsValidator = (req: Request, res: Response, next: NextFunction) => {
  const { productsIds } = req.body;

  const { error } = schema.validate({ productsIds });

  if (error) {
    const [details] = error.details;
    const { type, message } = details;

    if (type === 'any.required') {
      return res.status(ClientError.BAD_REQUEST).json({ message });
    }

    if (message.includes('does not contain 1 required value(s)')) {
      return res
        .status(ClientError.UNPROCESSABLE_ENTITY)
        .json({ message: '"productsIds" must include only numbers' });
    }

    return res.status(ClientError.UNPROCESSABLE_ENTITY).json({ message });
  }

  next();
};

export default productsIdsValidator;