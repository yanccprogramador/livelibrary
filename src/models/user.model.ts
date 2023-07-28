import mongoose, { type ObjectId } from 'mongoose'
const { Schema } = mongoose

const UserSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  username: String,
  password: String
})

export interface User {
  _id: ObjectId
  name: string
  username: string
  password: string
};

const UserModel = mongoose.model('users', UserSchema)
export default UserModel
