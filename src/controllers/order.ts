import { Response, Request } from 'express';
import { Success } from '../enums/http_status_codes';
import { OrderService } from '../services';

export class OrderController {
  service = new OrderService();

  public getAll = async (req: Request, res: Response): Promise<Response> => {
    const allOrders = await this.service.getAll();
    return res.status(Success.OK).json(allOrders);
  };
}

export default OrderController;