/* eslint-disable @typescript-eslint/consistent-type-imports */
import PostsClient from '../clients/posts/posts_client'
import AuthClient from '../clients/auth/auth_client'
import BaseHelper from './baseHelper'
import { Article } from '../core/types/types'

class PostsHelper extends BaseHelper {
  async createPostAsUser (loginData: { email: string, password: string }, articleData: { title: string, description: string, body: string }): Promise<Article> {
    const user = await AuthClient.authorize(loginData.email, loginData.password)
    const createdPost = await PostsClient.createPost(user.token, articleData)
    return createdPost
  }

  async deletePostAsUser (loginData: { email: string, password: string }, slug: string): Promise<void> {
    const user = await AuthClient.authorize(loginData.email, loginData.password)
    await PostsClient.deletePost(user.token, slug)
  }
}

export = PostsHelper
