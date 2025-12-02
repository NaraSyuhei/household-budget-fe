import axios, { type AxiosInstance, type AxiosError } from 'axios'
import { ApiError } from '../errors/ApiError'
import { TimeoutError } from '../errors/TimeoutError'

export const baseErrorIntercepter = (client: AxiosInstance) => {
  client.interceptors.response.use(
    (response) => response,
    (error) => {
      // Handle non-Axios errors
      if (!axios.isAxiosError(error)) {
        return Promise.reject(new ApiError(error.message, { raw: error }))
      }

      // Handle Axios errors (no response)
      const axiosError = error as AxiosError
      if (!axiosError.response) {
        //  Handle timeout errors
        if (axiosError.code === 'ECONNABORTED') {
          return Promise.reject(new TimeoutError(axiosError))
        }

        return Promise.reject(
          new ApiError('ネットワークエラーが発生しました', {
            code: axiosError.code,
            raw: axiosError,
          }),
        )
      }

      return Promise.reject(axiosError)
    },
  )
}
