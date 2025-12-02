import axios, { type AxiosInstance, type AxiosError } from 'axios'
import { type ErrorResponse } from '@/models/api/internal/backend/v1/response/error'
import { ApiError } from '@/services/base/errors/ApiError'

export const internalBackendV1ErrorIntercepter = (client: AxiosInstance) => {
  client.interceptors.response.use(
    (response) => response,
    (error) => {
      // APIエラーの場合はそのまま投げる
      if (error instanceof ApiError) {
        return Promise.reject(error)
      }

      // Axiosのエラー以外は予期せぬエラーとして投げる
      if (!axios.isAxiosError(error)) {
        return Promise.reject(new ApiError('予期せぬエラーが発生しました', { raw: error }))
      }

      // Axiosのエラーの場合はAPIエラーとして投げる
      const axiosError = error as AxiosError<ErrorResponse>
      const status = axiosError.response?.status
      const code = axiosError.code
      const detail = axiosError.response?.data?.detail

      const message =
        detail ??
        (status && status >= 500
          ? 'サーバーでエラーが発生しました'
          : '通信中にエラーが発生しました')

      return Promise.reject(new ApiError(message, { status, code, detail, raw: axiosError }))
    },
  )
}
