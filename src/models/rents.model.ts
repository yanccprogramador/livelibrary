import mongoose from 'mongoose'
const { Schema } = mongoose

const RentSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  book: { type: Schema.Types.ObjectId, ref: 'Book' },
  rentDate: Date
})

const RentModel = mongoose.model('Rent', RentSchema)
export default RentModel
