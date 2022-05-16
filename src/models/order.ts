import { ResultSetHeader, RowDataPacket } from 'mysql2';
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

  public create = async (newOrder: Order): Promise<Order> => {
    const { productsIds, userId } = newOrder;

    const queryOrder = 'INSERT INTO Trybesmith.Orders (userId) VALUES (?)';
    const [{ insertId }] = await connection.execute<ResultSetHeader>(queryOrder, [userId]);

    await Promise.all(productsIds.map(async (id) => {
      const queryProductId = 'UPDATE Trybesmith.Products SET orderId = ? WHERE id = ?';
      await connection.execute<ResultSetHeader>(queryProductId, [insertId, id]);
    }));

    return { userId, productsIds };
  };
}

export default OrderModel;