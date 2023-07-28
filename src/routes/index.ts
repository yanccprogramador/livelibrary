import { Router } from 'express'
import userRouter from './users'
import bookRouter from './books'
import rentRouter from './rent'
const router = Router()

router.use('/users', userRouter)
router.use('/books', bookRouter)
router.use('/rent', rentRouter)

export default router
