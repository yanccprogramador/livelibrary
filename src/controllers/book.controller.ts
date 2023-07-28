import { BookService } from '../services/book.service'
import { type Request, type Response } from 'express'
/**
 * GET /books
 * @summary List books
 * @security BearerAuth
 * @tags Books
 * @param {string} request.query.search
 * @return {array} 200 - success response
 */
const list = async (req: Request, res: Response): Promise<Response> => {
  const result = await BookService.getAll(req.query.search?.toString() ?? '')
  return res.status(200).json(result)
}
/**
 * A login body type
 * @typedef {object} CreateBook
 * @property {string} name.required - The name
 * @property {string} code.required - The code
 */
/**
 * POST /books
 * @summary create a book
 * @security BearerAuth
 * @tags Books
 * @param {CreateBook} request.body.required
 * @return {object} 201 - success response
 * @return {object} 500 - error response
 */
const createBook = async (req: Request, res: Response): Promise<Response> => {
  const result = await BookService.create(req.body)
  return res.status(201).json(result)
}
/**
 * DELETE /books/:id
 * @summary delete a book
 * @security BearerAuth
 * @tags Books
 * @param {string} request.param.required
 * @return {object} 204 - success response
 * @return {object} 500 - error response
 */
const remove = async (req: Request, res: Response): Promise<Response> => {
  const book = await BookService.remove(req.params.id)
  if (book == false) {
    return res.status(500).json({ message: 'Book is rented you can not remove it' })
  }
  return res.status(204).json()
}
/**
 * GET /books/:id
 * @summary get a book
 * @security BearerAuth
 * @tags Books
 * @param {string} request.param.required
 * @return {object} 200 - success response
 * @return {object} 500 - error response
 */
const get = async (req: Request, res: Response): Promise<Response> => {
  const book = await BookService.get(req.params.id)
  return res.status(200).json(book)
}

/**
 * PUT /books/:id
 * @summary update a book
 * @security BearerAuth
 * @tags Books
 * @param {string} request.param.required
 * @return {object} 204 - success response
 * @return {object} 500 - error response
 */
const update = async (req: Request, res: Response): Promise<Response> => {
  const book = await BookService.update(req.params.id, req.body)
  if (book == false) {
    return res.status(500).json({ message: 'Book is rented you can not update it' })
  }
  return res.status(204).json()
}

export const BookController = {
  list,
  createBook,
  remove,
  get,
  update
}
