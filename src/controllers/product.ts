import { Response, Request } from 'express';
import { Success } from '../enums/http_status_codes';
import { ProductService } from '../services';

export class ProductController {
  service = new ProductService();

  public getAll = async (req: Request, res: Response): Promise<Response> => {
    const allProducts = await this.service.getAll();
    return res.status(Success.OK).json(allProducts);
  };

  public create = async (req: Request, res: Response): Promise<Response> => {
    const product = req.body;
    const id = await this.service.create(product);
    return res.status(Success.CREATED).json({ id, ...product });
  };
}

export default ProductController;