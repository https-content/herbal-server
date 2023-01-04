import { Schema, Types, model } from 'mongoose'

interface IProduct {
  name: string
  icon: string
  category: Types.ObjectId
}

const ProductSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
    },
    category: {
      type: Schema.Types.ObjectId,
    },
    icon: {
      type: String,
      maxlength: 1,
    },
  },
  {
    timestamps: true,
  }
)

const Product = model<IProduct>('Product', ProductSchema)
export default Product
