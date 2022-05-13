import { ProductModel } from '../models';
import { Product } from '../interfaces';

export class ProductService {
  model = new ProductModel();

  public getAll = async (): Promise<Product[]> => this.model.getAll();
}

export default ProductService;