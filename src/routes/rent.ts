import { Router } from 'express'
import { RentController } from '../controllers/rent.controller'
import authMiddleware from '../middleware'

const router = Router()

router.post('/', authMiddleware, RentController.rent)

export default router
