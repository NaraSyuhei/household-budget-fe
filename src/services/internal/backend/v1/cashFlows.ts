import { internalBackendV1Client } from './client'

import {
  type GetCashFlowsRequestQueryParams,
  type CreateCashFlowRequest,
  type UpdateCashFlowRequest,
  type DeleteCashFlowRequestPathParams,
} from '@/models/api/internal/backend/v1/request/cashFlows'
import {
  type GetCashFlowsResponseItem,
  type CreateCashFlowResponse,
  type UpdateCashFlowResponse,
} from '@/models/api/internal/backend/v1/response/cashFlows'

const BASE_URL = '/cash-flows'

export const getCashFlows = async (
  params?: GetCashFlowsRequestQueryParams,
): Promise<GetCashFlowsResponseItem[]> => {
  const response = await internalBackendV1Client.get<GetCashFlowsResponseItem[]>(BASE_URL, {
    params: params,
  })
  return response.data
}

export const createCashFlow = async (
  data: CreateCashFlowRequest,
): Promise<CreateCashFlowResponse> => {
  const response = await internalBackendV1Client.post<CreateCashFlowResponse>(BASE_URL, data)
  return response.data
}

export const updateCashFlow = async (
  id: number,
  data: UpdateCashFlowRequest,
): Promise<UpdateCashFlowResponse> => {
  const response = await internalBackendV1Client.put<UpdateCashFlowResponse>(
    `${BASE_URL}/${id}`,
    data,
  )
  return response.data
}

export const deleteCashFlow = async (params: DeleteCashFlowRequestPathParams): Promise<void> => {
  await internalBackendV1Client.delete<void>(`${BASE_URL}/${params.id}`)
}
