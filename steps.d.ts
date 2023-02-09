/// <reference types='codeceptjs' />
type mainPage = typeof import('./pages/main_page');
type loginPage = typeof import('./pages/login_page');
type registrationPage = typeof import('./pages/registration_page');
type AuthHelper = import('./helpers/authHelper');
type PostsHelper = import('./helpers/postsHelper');
type CommonHelper = import('./helpers/commonHelper');

declare namespace CodeceptJS {
  interface SupportObject { I: I, current: any, mainPage: mainPage, loginPage: loginPage, registrationPage: registrationPage }
  interface Methods extends PlaywrightTs, AuthHelper, PostsHelper, CommonHelper {}
  interface I extends WithTranslation<Methods> {}
  namespace Translation {
    interface Actions {}
  }
}
