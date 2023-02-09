const { I } = inject()

class MainPage {
  url: string
  signInButton: CodeceptJS.Locator
  globalFeedTab: CodeceptJS.Locator
  constructor () {
    this.url = '/'
    this.signInButton = locate('a').withAttr({ href: '#login' })
    this.globalFeedTab = locate('a').withText('Global Feed')
  }

  username (username: string): CodeceptJS.Locator {
    return locate('a').withAttr({ href: '@' + username })
  }

  article (slug: string): CodeceptJS.Locator {
    return locate('div').withAttr({ class: 'article-preview' }).withChild(locate('a').withAttr({ href: '#article/' + slug }))
  }

  like (slug: string): CodeceptJS.Locator {
    return locate('button').inside(this.article(slug))
  }

  async waitForArticle (slug: string): Promise<boolean> {
    return await I.waitForElement(this.article(slug), 10)
  }

  async likePost (slug: string): Promise<boolean> {
    return await I.click(this.like(slug))
  }

  async waitForLikeCount (slug: string, count: string): Promise<boolean> {
    return await I.waitForText(count, 30, this.like(slug))
  }
}

export = new MainPage()
