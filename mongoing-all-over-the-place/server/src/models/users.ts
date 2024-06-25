import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    }
})

export interface User {
    _id: string
    name: string
    age: number
}

export const UserModel = mongoose.model("users", UserSchema);
