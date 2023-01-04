import { Schema, model } from 'mongoose'

interface IProductCategory {
  name: string
}

const ProductCategorySchema = new Schema<IProductCategory>({
  name: {
    type: String,
    unique: true,
  },
})

const ProductCategory = model<IProductCategory>(
  'ProductCategory',
  ProductCategorySchema
)
export default ProductCategory
