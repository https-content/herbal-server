import { Router } from 'express'
import { add, find, list } from '../controllers/user'
import isAuth from '../middlewares/isAuth'
const router = Router()

router.post('/', isAuth, add)
router.get('/', isAuth, list)
router.get('/:id', isAuth, find)

export default router