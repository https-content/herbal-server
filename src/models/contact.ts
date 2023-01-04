import { Schema, model } from 'mongoose'

interface IContact {
  name: string
  number: string
  email: string
}

const ContactSchema = new Schema<IContact>({
  name: String,
  number: {
    type: String,
    maxlength: 10,
  },
  email: {
    type: String,
    maxlength: 64,
  },
})

const Contact = model<IContact>('Contact', ContactSchema)
export default Contact
