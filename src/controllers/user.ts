import { Request, Response } from 'express'
import User from '../models/user'
import bcrypt from 'bcrypt'
import { availableNickname } from '../helpers/user'
import jwt from 'jsonwebtoken'

interface AuthInput {
  nickname: string
  password: string
}

interface UserInput {
  nickname: string
  password: string
  email: string
}

export const list = async (req: Request, res: Response) => {
  try {
    const users = await User.find()
    return res.status(200).json(users)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: 'Internal server error', err })
  }
}

export const add = async (req: Request, res: Response): Promise<Response> => {
  const { nickname, email, password }: UserInput = req.body
  try {
    const existsMail = await User.findOne({ email })
    const freeNickname = await availableNickname(nickname)

    if (existsMail) {
      return res
        .status(400)
        .json({ message: 'Já existe uma conta com esse email!' })
    }

    if (!freeNickname) {
      return res.status(400).json({ message: 'Nickname já está em uso!' })
    }

    const hashed = bcrypt.hashSync(password, 10)
    const user = await User.create({ nickname, email, password: hashed })

    return res.status(200).json(user)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: 'Internal server error', err })
  }
}

export const find = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const found = await User.findById(id)
    if (!found) {
      return res.status(404).json({ message: 'Usuário não encontrado' })
    }
    return res.status(200).json(found)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: 'Internal server error', err })
  }
}

export const update = async (req: Request, res: Response) => {}

export const remove = async (req: Request, res: Response) => {}

export const auth = async (req: Request, res: Response) => {
  console.log('fell to auth controller function')
  const { nickname, password }: AuthInput = req.body
  try {
    const user = await User.findOne({ nickname })
    if (user) {
      const validPassword = bcrypt.compareSync(password, user.password)
      if (validPassword) {
        console.log(user)
        const token = jwt.sign(
          { userId: user.id },
          process.env.JWT_SECRET ?? 'thatsasecret',
          {
            expiresIn: 60 * 15,
          }
        )
        return res.status(200).json({
          message: `Logado como ${user.nickname}`,
          user: {
            nickname: user.nickname,
            email: user.email,
          },
          token,
          state: 'ok',
        })
      } else {
        return res
          .status(400)
          .json({ message: 'Usuário ou senha inválidos', state: 'error' })
      }
    } else {
      return res
        .status(400)
        .json({ message: 'Usuário ou senha inválidos', state: 'error' })
    }
  } catch (err) {
    console.log(err)
    return res
      .status(500)
      .json({ message: 'Erro interno no servidor', err, state: 'error' })
  }
}
