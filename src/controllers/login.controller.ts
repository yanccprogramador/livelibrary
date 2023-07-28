import { LoginService } from '../services/login.service'
import { type Request, type Response } from 'express'
/**
 * A login body type
 * @typedef {object} LoginBody
 * @property {string} login.required - The username
 * @property {string} password.required - The password
 */
/**
 * POST /users/login
 * @summary made a login
 * @tags Login
 * @param {LoginBody} request.body.required
 * @return {object} 201 - success response
 * @return {object} 403 - error response
 */
const login = async (req: Request, res: Response): Promise<Response> => {
  const result = await LoginService.login(req.body)
  if (result != false) {
    return res.status(200).json(result)
  }
  return res.status(403).json({ message: 'Unauthorized' })
}
/**
 * A user body type
 * @typedef {object} UserBody
 * @property {string} username.required - The username
 * @property {string} password.required - The password
 * @property {string} name.required - The password
 */
/**
 * POST /users
 * @summary create a user
 * @tags Login
 * @param {UserBody} request.body.required
 * @return {object} 201 - success response
 * @return {object} 403 - error response
 */
const create = async (req: Request, res: Response): Promise<Response> => {
  const result = await LoginService.create(req.body)
  if (result != false) {
    return res.status(201).json(result)
  }
  return res.status(403).json({ message: 'Username exists' })
}

export const LoginController = {
  login,
  create
}
