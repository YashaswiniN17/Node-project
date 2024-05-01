import { Router } from 'express';
import { ProductController } from '@controllers/products.controller';
import { CreateProductDto, UpdateProductDto } from '@dtos/products.dto';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';

export class ProductRoute implements Routes {
  public path = '/products';
  public router = Router();
  public products = new ProductController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/GetAllProducts`, this.products.getProducts);
    this.router.get(`${this.path}/GetProductById/:Id`, this.products.getProductById);
    this.router.post(`${this.path}/PostProduct`, this.products.createProduct);
    this.router.put(`${this.path}/PutProduct/:Id`, this.products.updateProduct);
    this.router.delete(`${this.path}/DeleteProduct/:id`, this.products.deleteProduct);
    this.router.put(`${this.path}/ChangeActiveStatus/:Id`, this.products.setIsActive);
    this.router.get(`${this.path}/GetAllProductsCsv`, this.products.getProductsCsv);

  }
}