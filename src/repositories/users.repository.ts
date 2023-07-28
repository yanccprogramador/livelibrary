import mongoose from 'mongoose'
import UserModel from '../models/user.model'
import { Md5 } from 'ts-md5'

const findByUsername = async (username: string) => {
  return await UserModel.findOne({ username }).exec()
}
const create = async (user: any) => {
  return await UserModel.create({ ...user, password: Md5.hashStr(user.password.toString()), _id: new mongoose.Types.ObjectId(user._id) })
}
export const UserRepository = {
  findByUsername,
  create
}
