import { Md5 } from 'ts-md5'
import { UserRepository } from '../repositories/users.repository'
import { JwtTokenRepository } from '../repositories/jwtToken.repository'

const login = async (user: any) => {
  const loggedUser = await UserRepository.findByUsername(user.login)
  if ((loggedUser != null) && loggedUser.password == Md5.hashStr(user.password.toString())) {
    return await createToken(loggedUser)
  }
  return false
}

const createToken = async (user: any) => {
  const hash = Md5.hashStr(`${(new Date().toUTCString)}-${user.username}`)
  await JwtTokenRepository.deleteByUser(user._id)
  await JwtTokenRepository.create({ user: user._id, token: hash, created: new Date() })
  return hash
}

const validateToken = async (token: string | undefined) => {
  const jwt = await JwtTokenRepository.findByToken(token ?? '')
  const today = new Date()
  return ((jwt?.created) != null) &&
    jwt?.created.valueOf() - today.valueOf() <= Number(process.env.JWT_TOKEN_TIME)
}
const create = async (user: any) => {
  const userNameExists = await UserRepository.findByUsername(user.username)
  if (userNameExists != null) {
    return false
  }
  const response = await UserRepository.create(user)
  return response
}
export const LoginService = {
  login,
  validateToken,
  create
}
