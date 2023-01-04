import { Schema, model } from 'mongoose'

interface ICommand {
  command: string
  active: boolean
  steps: ICommandStep[]
}

interface ICommandStep {
  message?: string
  menu?: [
    {
        key: string,
        title: string
    }
  ]
}

const CommandSchema = new Schema<ICommand>({
  command: {
    type: String,
    unique: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
})

const Command = model<ICommand>('Command', CommandSchema)
export default Command
