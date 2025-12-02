import axios, { type AxiosRequestConfig } from 'axios'
import { baseErrorIntercepter } from './intercepter/errorIntercepter'

export const createBaseClient = (config: AxiosRequestConfig) => {
  const client = axios.create(config)

  baseErrorIntercepter(client)

  return client
}
