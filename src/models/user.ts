import { Schema, model } from 'mongoose'

interface IUser {
    nickname: string
    email: string
    password: string
}

const UserSchema = new Schema<IUser>({
    nickname: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
    }
}, {
    timestamps: true
}) 

const User = model<IUser>('User', UserSchema)

export default User