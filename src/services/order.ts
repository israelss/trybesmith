import { OrderModel } from '../models';
import { Order } from '../interfaces';

export class OrderService {
  model = new OrderModel();

  public getAll = async (): Promise<Order[]> => this.model.getAll();

  public create = async (newOrder: Order): Promise<Order> => this.model.create(newOrder);
}

export default OrderService;