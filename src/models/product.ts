import connection from './connection';
import { Product } from '../interfaces';

export class ProductModel {
  public getAll = async (): Promise<Product[]> => {
    const query = 'SELECT * FROM Trybesmith.Products';
    const [allProducts] = await connection.execute(query);

    return allProducts as Product[];
  };
}

export default ProductModel;