const { I } = inject()

class LoginPage {
  url: string
  signInHeader: CodeceptJS.Locator
  emailField: CodeceptJS.Locator
  passwordFiled: CodeceptJS.Locator
  loginButton: CodeceptJS.Locator
  errors: {
    invalidLoginOrPassword: CodeceptJS.Locator
  }

  constructor () {
    this.url = '/#/login'
    this.signInHeader = locate('h1').withText('Sign In')
    this.emailField = locate('input').withAttr({ type: 'email' })
    this.passwordFiled = locate('input').withAttr({ type: 'password' })
    this.loginButton = locate('button').withAttr({ type: 'submit' })
    this.errors = {
      invalidLoginOrPassword: locate('li').withText('email or password is invalid')
    }
  }

  async fillLoginForm (email: string, password: string): Promise<void> {
    await I.fillField(this.emailField, email)
    await I.fillField(this.passwordFiled, password)
  }
}

export = new LoginPage()
