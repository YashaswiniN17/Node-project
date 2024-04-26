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

  public async findProductById(_id: string,productData:Products): Promise<Products> {
    const findproduct: Products = await ProductModel.findOne({ _id: productData.product_id });

    return findproduct;
  }

  public async createProduct(productData: Products): Promise<Products> {
    const findProduct: Products = await ProductModel.findOne({ product_name: productData.product_name });
    if (findProduct) throw new HttpException(409, `This product ${productData.product_name} already exists`);

    const quantity = await (productData.quantity, 10);
    const createUserData: Products = await ProductModel.create({ ...productData, quantity: quantity });

    return createUserData;
  }

  public async updateProduct(_id: string, productData: Products): Promise<Products> {
    
    const updateProductById: Products = await ProductModel.findByIdAndUpdate( productData.product_id, { ...productData });
   
    return updateProductById;
  }

  public async deleteProduct(_id: string,productData:Products): Promise<Products> {
    const deleteProductById: Products = await ProductModel.findByIdAndDelete(productData.product_id,{...productData});

    return deleteProductById;
  }
}