/* eslint-disable @typescript-eslint/consistent-type-imports */
import { Article } from '../../core/types/types'
import BaseClient from '../base_client'

const _url = 'https://api.realworld.io'
const _timeout = 3000

class PostsClient extends BaseClient {
  async createPost (authToken: string, articleData: { title: string, description: string, body: string }): Promise<Article> {
    const data = { article: articleData }
    const response = await this._sendRequest('POST', '/api/articles', data, { 'Content-Type': 'application/json', authorization: 'Token ' + authToken })
    try {
      return response.data.article as Article
    } catch (e) {
      throw new Error('Cant parse article')
    }
  }

  async deletePost (authToken: string, slug: string): Promise<any> {
    const response = await this._sendRequest('DELETE', '/api/articles/' + slug, null, { authorization: 'Token ' + authToken })
    return response.data
  }
}
export = new PostsClient(_url, _timeout)
