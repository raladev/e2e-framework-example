/* eslint-disable @typescript-eslint/consistent-type-imports */
import AuthClient from '../clients/auth/auth_client'
import BaseHelper from './baseHelper'

class AuthHelper extends BaseHelper {
  async authorize (loginData: { email: string, password: string }): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/dot-notation
    const { page } = this.helpers.Playwright
    const domain = 'https://react-redux.realworld.io'
    await page.goto(domain)

    const user = await AuthClient.authorize(loginData.email, loginData.password)
    await page.addInitScript((token: string) => {
      window.localStorage.setItem('jwt', token)
    }, user.token)
    await page.reload()
  }
}

export = AuthHelper
