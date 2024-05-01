//import { hash } from 'bcrypt';
import { Service } from 'typedi';
import { HttpException } from '@exceptions/HttpException';
import { Products } from '@interfaces/products.interface';
import { ProductModel } from '@models/products.model';
import { exit } from 'process';

@Service()
export class ProductService {
  public async findAllProduct(): Promise<Products[]> {
    const users: Products[] = await ProductModel.find();
    return users;
  }

  public async findAllProductResponse(req: any): Promise<any> {
    const data = await this.findAllProduct();

    if (req.headers.accept && req.headers.accept.includes('text/csv')) {
      const dataKeys = Object.keys(data[0]);
      let csvContent = dataKeys.join(",") + "\n";
      data.forEach(product => {
          csvContent += dataKeys.map(key => product[key]).join(",") + "\n";
      });
      return { data: csvContent, message: 'findAll (CSV)' };
    } else {
      return { data, message: 'findAll' };
    }
  }

  public async findProductById(_Aid: string): Promise<Products> {
    const findproduct: Products = await ProductModel.findById(_Aid);

    return findproduct;
  }


  public async createProduct(productData: Products): Promise<Products> {
    const findProduct: Products = await ProductModel.findOne({ product_name: productData.product_name });
    if (findProduct) throw new HttpException(409, `This product ${productData.product_name} already exists`);

    const quantity = await (productData.quantity); // y await??
    const createUserData: Products = await ProductModel.create({ ...productData, quantity: quantity });

    return createUserData;
  }

  public async updateProduct(_id: string, productData: Products): Promise<Products> {
    const updateProductById: Products = await ProductModel.findByIdAndUpdate( productData.product_id, { ...productData });
   
    return updateProductById;
  }

  public async deleteProduct(_id: string): Promise<Products> {
    const deleteProductById: Products = await ProductModel.findByIdAndDelete(_id);
    return deleteProductById;
  }
  public async changeIsActive(_id: string): Promise<Products> {
    const updatedProduct:Products = await ProductModel.findById(
      _id
    );
    updatedProduct.isActive=!updatedProduct.isActive;
    await ProductModel.findByIdAndUpdate(_id,{...updatedProduct});
    return updatedProduct;
  }
  
}