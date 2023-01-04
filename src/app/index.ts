import express, { Request, Response } from 'express'
import cors from 'cors'
import TableRouter from '../routes/table'
import UserRouter from '../routes/user'
import AuthRouter from '../routes/auth'

import * as dotenv from "dotenv";
dotenv.config();

const app = express()
app.use(express.json())
app.use(cors())
//routes
app.use('/table', TableRouter)
app.use('/user', UserRouter)
app.use('/auth', AuthRouter)

export default app