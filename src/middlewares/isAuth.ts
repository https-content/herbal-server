import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

export default function isAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization
  if (!authHeader) {
    return res.status(401).json({ message: 'Token não informado' })
  }

  const [type, token] = authHeader.split(' ')

  try {
    const decodedtoken = jwt.verify(
      token,
      process.env.JWT_SECRET ?? 'thatsasecret'
    )
    if (decodedtoken)
    return next()
  } catch (err) {
    return res.status(401).json({ message: 'Token inválido' })
  }
}
