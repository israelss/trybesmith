import { RowDataPacket } from 'mysql2';
import { Order } from '../interfaces';
import connection from './connection';

export class OrderModel {
  public getAll = async (): Promise<Order[]> => {
    const ordersQuery = 'SELECT * FROM Trybesmith.Orders';
    const [ordersFromDB] = await connection.execute<RowDataPacket[]>(ordersQuery);

    const allOrders = await Promise.all(ordersFromDB.map(async (order) => {
      const productsQuery = 'SELECT id FROM Trybesmith.Products WHERE orderId = ?';
      const [[productsIds]] = await connection.execute<RowDataPacket[]>(productsQuery, [order.id]);
      return { ...order, productsIds: Object.values(productsIds) };
    }));

    return allOrders as Order[];
  };
}

export default OrderModel;