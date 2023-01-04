import { Router } from 'express'
import { auth } from '../controllers/user'
const router = Router()


router.post('/', auth)

export default router