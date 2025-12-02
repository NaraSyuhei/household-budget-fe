import { useQuery } from '@tanstack/react-query'

import { getCashFlows } from '@/services/internal/backend/v1/cashFlows'
import { homeRootQueryKeys } from './queryKeys'
import { type GetCashFlowsRequestQueryParams } from '@/models/api/internal/backend/v1/request/cashFlows'
import { type GetCashFlowsResponseItem } from '@/models/api/internal/backend/v1/response/cashFlows'
import { type CashFlowItemView } from '@/features/Home/Root/types/CashFlowItemView'

const mapToCashFlowItemView = (item: GetCashFlowsResponseItem): CashFlowItemView => {
  return {
    id: item.id,
    amount: item.amount,
    type: item.type,
    title: item.title,
    recordedAt: new Date(item.recordedAt),
  }
}

export const useGetCashFlowsQuery = (params?: GetCashFlowsRequestQueryParams) => {
  return useQuery({
    queryKey: [...homeRootQueryKeys.All, params?.target_month.toISOString()],
    queryFn: () => getCashFlows(params),
    select: (cashFlows) => cashFlows.map(mapToCashFlowItemView),
    retry: false,
  })
}
