import { Router } from 'express'
import { list, add, find, update, remove } from '../controllers/table'
import isAuth from '../middlewares/isAuth';

const router = Router()

router.get('/', list)
router.post('/', isAuth, add)
router.get('/:id', find)
router.put('/:id', isAuth, update)
router.delete('/:id', isAuth, remove)

export default router
