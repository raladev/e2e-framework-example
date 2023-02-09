// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { User } from '../../core/types/types'
import BaseClient from '../base_client'

const _url = 'https://api.realworld.io'
const _timeout = 3000

class AuthClient extends BaseClient {
  async authorize (email: string, password: string): Promise<User> {
    const data = {
      user: {
        email,
        password
      }
    }
    const response = await this._sendRequest('POST', '/api/users/login', data, { 'Content-Type': 'application/json' })
    try {
      return response.data.user as User
    } catch (e) {
      throw new Error('Cant parse user')
    }
  }
}
export = new AuthClient(_url, _timeout)
