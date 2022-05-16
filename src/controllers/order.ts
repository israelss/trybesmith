import { Response, Request } from 'express';
import { ClientError, Success } from '../enums/http_status_codes';
import { UserRequest } from '../interfaces';
import { OrderService } from '../services';

export class OrderController {
  service = new OrderService();

  public getAll = async (req: Request, res: Response): Promise<Response> => {
    const allOrders = await this.service.getAll();
    return res.status(Success.OK).json(allOrders);
  };

  public create = async (req: UserRequest, res: Response): Promise<Response> => {
    const { user } = req;
    if (!user) return res.status(ClientError.BAD_REQUEST).json({ message: 'User not found!' });
    const { id: userId } = user;
    const { productsIds } = req.body;
    const newOrder = await this.service.create({ userId, productsIds });
    return res.status(Success.CREATED).json(newOrder);
  };
}

export default OrderController;