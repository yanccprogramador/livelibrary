import { Router } from 'express'
import { LoginController } from '../controllers/login.controller'

const router = Router()

router.post('/login', LoginController.login)
router.post('/', LoginController.create)

export default router
