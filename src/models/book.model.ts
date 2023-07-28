import mongoose from 'mongoose'
const { Schema } = mongoose

const BookSchema = new Schema({
  name: String,
  code: Number,
  _id: Schema.Types.ObjectId
})

const BookModel = mongoose.model('Book', BookSchema)
export default BookModel
