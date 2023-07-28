import { Router } from 'express'
import { BookController } from '../controllers/book.controller'
import authMiddleware from '../middleware'

const router = Router()

router.post('/', authMiddleware, BookController.createBook)
router.get('/:id', BookController.get)
router.put('/:id', BookController.update)
router.delete('/:id', BookController.remove)
router.get('/', BookController.list)

export default router
