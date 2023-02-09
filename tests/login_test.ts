Feature('Login')

const accounts = new DataTable(['email', 'password', 'username', 'status'])
accounts.add(['aladev.r@gmail.com', '123456', 'ExistedUser', 'valid'])
accounts.add(['aladev.roar@gmail.com', '1234567', 'UnexistedUser', 'invalid'])

Scenario('Go to Login page from main menu', async ({ I, mainPage, loginPage }) => {
  await I.amOnPage(mainPage.url)
  await I.waitForElement(mainPage.signInButton)
  await I.click(mainPage.signInButton)
  await I.waitForElement(loginPage.signInHeader)
})

Scenario('Go to Login page from register page', async ({ I, registrationPage, loginPage }) => {
  await I.amOnPage(registrationPage.url)
  await I.waitForElement(registrationPage.signInButton)
  await I.click(registrationPage.signInButton)
  await I.waitForElement(loginPage.signInHeader)
})

// eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
Data(accounts.filter(account => account.status === 'valid'))
  .Scenario('Successful Login', async ({ I, current, mainPage, loginPage }) => {
    await I.amOnPage(loginPage.url)
    await I.waitForElement(loginPage.signInHeader)
    await loginPage.fillLoginForm(current.email, current.password)
    await I.click(loginPage.loginButton)
    await I.waitForElement(mainPage.username(current.username))
  })

// eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
Data(accounts.filter(account => account.status === 'invalid'))
  .Scenario('Unsuccessful Login', async ({ I, current, loginPage }) => {
    await I.amOnPage(loginPage.url)
    await I.waitForElement(loginPage.signInHeader)
    await loginPage.fillLoginForm(current.email, current.password)
    await I.click(loginPage.loginButton)
    await I.waitForElement(loginPage.errors.invalidLoginOrPassword)
  })
