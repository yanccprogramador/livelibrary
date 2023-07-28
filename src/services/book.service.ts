import { BookRepository } from '../repositories/book.repository'
import { RentService } from './rent.service'

const getAll = async (book: string) => {
  const books = await BookRepository.find(book)
  return books
}

const create = async (book: any) => {
  const books = await BookRepository.create(book)
  return books
}
const remove = async (id: string) => {
  const rented = await RentService.getByBook(id)
  if (rented != null) {
    return false
  }
  const books = await BookRepository.deleteById(id)
  return books
}
const get = async (id: string) => {
  const books = await BookRepository.findById(id)
  return books
}
const update = async (id: string, book: any) => {
  const rented = await RentService.getByBook(id)
  if (rented != null) {
    return false
  }
  const books = await BookRepository.update(id, book)
  return books
}

export const BookService = {
  getAll,
  create,
  remove,
  get,
  update
}
