//import { hash } from 'bcrypt';
import { Service } from 'typedi';
import { HttpException } from '@exceptions/HttpException';
import { Products } from '@interfaces/products.interface';
import { ProductModel } from '@models/products.model';

@Service()
export class ProductService {
  public async findAllProduct(): Promise<Products[]> {
    const users: Products[] = await ProductModel.find();
    return users;
  }

  public async findProductById(productId: string): Promise<Products> {
    const findProductById: Products = await ProductModel.findOne({ _id: productId });
    if (!findProductById) throw new HttpException(409, "Product doesn't exist");

    return findProductById
  
  }

  public async createProduct(productData: Products): Promise<Products> {
    const findProduct: Products = await ProductModel.findOne({ product_name: productData.product_name });
    if (findProduct) throw new HttpException(409, `This product ${productData.product_name} already exists`);

    const quantity = await (productData.quantity, 10);
    const createUserData: Products = await ProductModel.create({ ...productData, quantity: quantity });

    return createUserData;
  }

  public async updateProduct(_id: string, productData: Products): Promise<Products> {
    if (productData.product_name) {
      const findProduct: Products = await ProductModel.findOne({ product_name: productData.product_name });
      if (findProduct && findProduct.product_id != _id) throw new HttpException(409, `This product ${productData.product_name} already exists`);
    }
    const updateProductById: Products = await ProductModel.findByIdAndUpdate(_id, { productData });
    if (!updateProductById) throw new HttpException(409, "Product doesn't exist");

    return updateProductById;
  }

  public async deleteProduct(productId: string): Promise<Products> {
    const deleteProductById: Products = await ProductModel.findByIdAndDelete(productId);
    if (!deleteProductById) throw new HttpException(409, "Product doesn't exist");

    return deleteProductById;
  }
}