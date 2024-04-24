import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { Products } from '@interfaces/products.interface';
import { ProductService } from '@services/products.services';

export class ProductController {

  public product = Container.get(ProductService);

  public getProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllProductsData: Products[] = await this.product.findAllProduct();

      res.status(200).json({ data: findAllProductsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getProductById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const product_id: string = req.params.id;
      const findOneProductData: Products = await this.product.findProductById(product_id);

      res.status(200).json({ data: findOneProductData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const productData: Products = req.body;
      const createProductData: Products = await this.product.createProduct(productData);

      res.status(201).json({ data: createProductData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const product_id: string = req.params.id;
      const productData: Products = req.body;
      const updateProductData: Products = await this.product.updateProduct(product_id, productData);

      res.status(200).json({ data: updateProductData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const product_id: string = req.params.id;
      const deleteProductData: Products = await this.product.deleteProduct(product_id);

      res.status(200).json({ data: deleteProductData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}