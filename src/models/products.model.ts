import { model, Schema, Document } from 'mongoose';
import { Products } from '@interfaces/products.interface';

const ProductSchema: Schema = new Schema({
  product_name: {
    type: String,
    required: true,
    unique: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

export const ProductModel = model<Products & Document>('Products', ProductSchema);