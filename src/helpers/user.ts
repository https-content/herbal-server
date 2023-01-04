import User from '../models/user'

export const availableNickname = async (nickname: string): Promise<boolean> => {
  const exists = await User.findOne({ nickname })

  if (exists) {
    return false
  } else {
    return true
  }
}
