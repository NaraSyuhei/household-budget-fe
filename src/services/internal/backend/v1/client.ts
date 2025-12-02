import { config } from '@/core/config'
import { createBaseClient } from '@/services/base/httpClientFactory'
import { internalBackendV1ErrorIntercepter } from './intercepter/errorIntercepter'

const client = createBaseClient({
  baseURL: `${config.backendUrl}/api/v1`,
  withCredentials: true,
  timeout: 10000,
})

internalBackendV1ErrorIntercepter(client)

export const internalBackendV1Client = client
