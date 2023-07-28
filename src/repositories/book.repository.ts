import mongoose from 'mongoose'
import BookModel from '../models/book.model'

const find = async (book: string) => {
  return await BookModel.find(book ? { name: { $regex: `.*${book}.*` } } : {}).exec()
}

const findById = async (_id: string) => {
  return await BookModel.findOne({ _id }).exec()
}
const deleteById = async (_id: string) => {
  return await BookModel.deleteMany({ _id }).exec()
}
const create = async (book: any) => {
  return await BookModel.create({ ...book, _id: new mongoose.Types.ObjectId(book._id) })
}
const update = async (_id: string, book: any) => {
  return await BookModel.updateOne({ _id }, { $set: book }).exec()
}

export const BookRepository = {
  find,
  findById,
  deleteById,
  create,
  update
}
