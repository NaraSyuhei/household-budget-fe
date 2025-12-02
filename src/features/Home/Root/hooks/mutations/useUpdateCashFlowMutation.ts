import { useMutation, useQueryClient } from '@tanstack/react-query'

import { type UpdateCashFlowRequest } from '@/models/api/internal/backend/v1/request/cashFlows'
import { updateCashFlow } from '@/services/internal/backend/v1/cashFlows'
import { homeRootQueryKeys } from '../queries/queryKeys'

export const useUpdateCashFlowMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateCashFlowRequest }) =>
      updateCashFlow(id, data),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: homeRootQueryKeys.All,
      })
    },
  })
}
