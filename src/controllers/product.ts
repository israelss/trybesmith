import { Response, Request } from 'express';
import { Success } from '../enums/http_status_codes';
import { ProductService } from '../services';

export class ProductController {
  service = new ProductService();

  public getAll = async (req: Request, res: Response): Promise<Response> => {
    const allProducts = await this.service.getAll();
    return res.status(Success.OK).json(allProducts);
  };
}

export default ProductController;