import { type NextFunction, type Request, type Response } from 'express'
import { LoginService } from '../services/login.service'

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  if (process.env.NODE_ENV == 'test') {
    next(); return
  }
  const token = req.headers.authorization?.toString().split(' ')[1]
  const authenticated = await LoginService.validateToken(token)
  if (authenticated) {
    next()
    return
  }
  return res.status(403).json({ message: 'Unauthorized' })
}

export default authMiddleware
