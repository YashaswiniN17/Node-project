import { model, Schema, Document } from 'mongoose';
import { Products } from '@interfaces/products.interface';
import { bool } from 'envalid';

const ProductSchema: Schema = new Schema({
  product_id:{
    type: String,
    required:true,
    unique:true
  },
  product_name: {
    type: String,
    required: true,
    unique: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  IsActive: {
    type:bool,
    required:true
  }

});

export const ProductModel = model<Products & Document>('Products', ProductSchema);