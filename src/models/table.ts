import { Schema, Types, model } from 'mongoose'

interface ITable {
  name: string
  active: boolean
  products: Types.ObjectId[]
  icon: string
}

const TableSchema = new Schema<ITable>(
  {
    name: {
      type: String,
      required: true,
    },
    products: {
      type: [Schema.Types.ObjectId],
      ref: 'Product',
    },
    active: {
      type: Boolean,
      default: true,
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

const Table = model<ITable>('Table', TableSchema)
export default Table
