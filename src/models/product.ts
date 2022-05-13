import { ResultSetHeader } from 'mysql2';
import connection from './connection';
import { Product } from '../interfaces';

export class ProductModel {
  public getAll = async (): Promise<Product[]> => {
    const query = 'SELECT * FROM Trybesmith.Products';
    const [allProducts] = await connection.execute(query);

    return allProducts as Product[];
  };

  public create = async (product: Product): Promise<number> => {
    const { name, amount } = product;
    const query = 'INSERT INTO Trybesmith.Products (name, amount) VALUES (?, ?)';
    const [result] = await connection.execute<ResultSetHeader>(query, [name, amount]);
    return result.insertId;
  };
}

export default ProductModel;