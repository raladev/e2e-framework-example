/* eslint-disable @typescript-eslint/strict-boolean-expressions */
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import axios, { AxiosInstance, AxiosResponse } from 'axios'

export default abstract class BaseClient {
  _client: AxiosInstance

  constructor (url: string, timeout: number) {
    this._client = this._createClient(url, timeout)
  }

  _createClient (url: string, timeout: number): AxiosInstance {
    const client = axios.create({
      baseURL: url,
      timeout
    })

    client.interceptors.response.use((response) => {
      return response
    }, (error) => {
      console.log('Got Error:')
      console.log(error.response.status)
      console.log(error.response.statusText)
      console.log(error.response.data)
      return error
    })
    // TODO Add reties (axios-retry?)
    return client
  }

  async _sendRequest (method: string, url: string, data: any = null, headers = {}): Promise<AxiosResponse<any, any>> {
    const request = {
      method,
      url,
      headers,
      data
    }

    const response = await this._client(request)

    return response
  }
}
