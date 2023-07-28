import { type Request, type Response } from 'express'
import { RentService } from '../services/rent.service'
/**
 * A Rent body type
 * @typedef {object} RentBody
 * @property {string} book.required - The id
 */
/**
 * POST /rent
 * @summary Rent a book
 * @security BearerAuth
 * @tags Rent
 * @param {RentBody} request.body.required
 * @return {object} 201 - success response
 * @return {object} 500 - error response
 */
const rent = async (req: Request, res: Response): Promise<Response> => {
  const result = await RentService.rent(req.body.book, req.headers.authorization?.split(' ')[1] ?? '')
  if (result == false) {
    return res.status(500).json({ message: 'Book is already rented' })
  }
  return res.status(201).json(result)
}

export const RentController = {
  rent
}
