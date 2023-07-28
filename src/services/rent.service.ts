import { JwtTokenRepository } from '../repositories/jwtToken.repository'
import { RentRepository } from '../repositories/rent.repository'

const rent = async (book: string, token: string) => {
  const user = await JwtTokenRepository.findByToken(token)
  const rented = await RentRepository.findByBook(book)
  if (rented != null) {
    return false
  }
  const rent = await RentRepository.create({ book, user: user?._id })
  return rent
}
const getByBook = async (id: string) => {
  const books = await RentRepository.findByBook(id)
  return books
}

export const RentService = {
  rent,
  getByBook
}
