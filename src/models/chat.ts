import { Schema, model } from 'mongoose'

interface IChat {
  contactId: string
  greetingMessage?: string
  farewellMessage?: string
  currentCommand?: string
  currentCommandStep?: string
}

const ChatSchema = new Schema<IChat>(
  {
    contactId: {
      type: String,
      required: true,
    },
    greetingMessage: {
      type: String,
    },
    farewellMessage: {
      type: String,
    },
    currentCommand: {
      type: String,
    },
    currentCommandStep: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

const Chat = model<IChat>('Chat', ChatSchema)
export default Chat
