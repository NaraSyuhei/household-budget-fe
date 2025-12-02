import { useMutation, useQueryClient } from '@tanstack/react-query'

import { type DeleteCashFlowRequestPathParams } from '@/models/api/internal/backend/v1/request/cashFlows'
import { deleteCashFlow } from '@/services/internal/backend/v1/cashFlows'
import { homeRootQueryKeys } from '../queries/queryKeys'

export const useDeleteCashFlowMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (params: DeleteCashFlowRequestPathParams) => deleteCashFlow(params),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: homeRootQueryKeys.All,
      })
    },
  })
}
