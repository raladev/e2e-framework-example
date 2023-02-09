class RegistrationPage {
  url: string
  signInButton: CodeceptJS.Locator

  constructor () {
    this.url = '/#/register'
    this.signInButton = locate('a').withText('Have an account?')
  }
}

export = new RegistrationPage()
