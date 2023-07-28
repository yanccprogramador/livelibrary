import mongoose from 'mongoose'
const { Schema } = mongoose

const JwtTokenSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'user' },
  token: String,
  created: Date
})

const JwtTokenModel = mongoose.model('JwtToken', JwtTokenSchema)
export default JwtTokenModel
