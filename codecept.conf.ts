export const config: CodeceptJS.MainConfig = {
  tests: '*/*_test.ts',
  output: './output',
  helpers: {
    Playwright: {
      url: 'https://react-redux.realworld.io',
      show: true,
      browser: 'chromium',
      waitForNavigation: 'networkidle0',
      waitForTimeout: 12000
    },
    AuthHelper: {
      require: './helpers/authHelper.ts'
    },
    PostsHelper: {
      require: './helpers/postsHelper.ts'
    },
    CommonHelper: {
      require: './helpers/commonHelper.ts'
    }
  },
  include: {
    mainPage: './pages/main_page.ts',
    loginPage: './pages/login_page.ts',
    registrationPage: './pages/registration_page.ts'
  },
  name: 'tests_example',
  fullPromiseBased: true
}
