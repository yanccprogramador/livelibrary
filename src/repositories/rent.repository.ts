import mongoose from 'mongoose'
import RentModel from '../models/rents.model'

const findByBook = async (book: string) => {
  return await RentModel.findOne({ book }).exec()
}

const create = async (rent: any) => {
  return await RentModel.create({ ...rent, _id: new mongoose.Types.ObjectId(rent._id) })
}

export const RentRepository = {
  findByBook,
  create
}
