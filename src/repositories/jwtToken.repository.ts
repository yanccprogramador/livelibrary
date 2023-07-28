import JwtTokenModel from '../models/jwtTokens.model'

const findByUser = async (user: string) => {
  return await JwtTokenModel.findOne({ user }).exec()
}

const findByToken = async (token: string) => {
  return await JwtTokenModel.findOne({ token }).exec()
}
const deleteByUser = async (user: string) => {
  return await JwtTokenModel.deleteMany({ user }).exec()
}

const create = async (jwtTokenSchema: any) => {
  return await JwtTokenModel.create(jwtTokenSchema)
}

export const JwtTokenRepository = {
  findByUser,
  findByToken,
  deleteByUser,
  create
}
