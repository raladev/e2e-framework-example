// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { Article } from '../core/types/types'

Feature('Like')

let createdPost: Article

// Test data
const USER_1_LOGIN_DATA = { email: 'aladev.r@gmail.com', password: '123456' }
const USER_2_LOGIN_DATA = { email: 'aladev.r2@gmail.com', password: '123456' }
const ARTICLE_DATA = { title: 'myteo 12', description: 'myde 14 sco', body: 'my body' }

Before(async ({ I }) => {
  createdPost = await I.createPostAsUser(USER_1_LOGIN_DATA, ARTICLE_DATA)
})

After(async ({ I }) => {
  await I.deletePostAsUser(USER_1_LOGIN_DATA, createdPost.slug)
})

Scenario('Unauthorized like', async ({ I, mainPage }) => {
  // Before
  await I.authorize(USER_1_LOGIN_DATA)
  await I.amOnPage(mainPage.url)
  await I.click(mainPage.globalFeedTab)
  // Test
  await mainPage.waitForArticle(createdPost.slug)
  await mainPage.waitForLikeCount(createdPost.slug, '0')
  await mainPage.likePost(createdPost.slug)
  await mainPage.waitForLikeCount(createdPost.slug, '1')
})

Scenario('Authorized like', async ({ I, mainPage }) => {
  // Before
  await I.authorize(USER_1_LOGIN_DATA)
  await I.amOnPage(mainPage.url)
  await I.click(mainPage.globalFeedTab)
  // Test
  await mainPage.waitForArticle(createdPost.slug)
  await mainPage.waitForLikeCount(createdPost.slug, '0')
  await mainPage.likePost(createdPost.slug)
  await mainPage.waitForLikeCount(createdPost.slug, '1')
})

Scenario('Getting several likes', async ({ I, mainPage }) => {
  // Before
  await I.authorize(USER_1_LOGIN_DATA)
  await I.amOnPage(mainPage.url)
  await I.click(mainPage.globalFeedTab)
  await mainPage.waitForArticle(createdPost.slug)
  // Test
  await mainPage.likePost(createdPost.slug)
  await mainPage.waitForLikeCount(createdPost.slug, '1')
  // aladev.r@gmail.com followed by user aladev.r2@gmail.com
  await I.authorize(USER_2_LOGIN_DATA)
  await I.amOnPage(mainPage.url)
  await mainPage.waitForArticle(createdPost.slug)
  await mainPage.likePost(createdPost.slug)
  await mainPage.waitForLikeCount(createdPost.slug, '2')
})

Scenario('Like removal', async ({ I, mainPage }) => {
  // Before
  await I.authorize(USER_1_LOGIN_DATA)
  await I.amOnPage(mainPage.url)
  await I.click(mainPage.globalFeedTab)
  await mainPage.waitForArticle(createdPost.slug)
  await mainPage.likePost(createdPost.slug)
  // Test
  await mainPage.waitForLikeCount(createdPost.slug, '1')
  await mainPage.likePost(createdPost.slug)
  await mainPage.waitForLikeCount(createdPost.slug, '0')
})
