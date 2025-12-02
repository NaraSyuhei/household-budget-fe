import { useMutation, useQueryClient } from '@tanstack/react-query'

import { type CreateCashFlowRequest } from '@/models/api/internal/backend/v1/request/cashFlows'
import { createCashFlow } from '@/services/internal/backend/v1/cashFlows'
import { homeRootQueryKeys } from '../queries/queryKeys'

export const useCreateCashFlowMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateCashFlowRequest) => createCashFlow(data),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: homeRootQueryKeys.All,
      })
    },
  })
}
