import { HomeRootPresentational } from './HomeRootPresentational'

import { useGetCashFlowsHandler } from '@/features/Home/Root/hooks/handlers/useGetCashFlowsHandler'
import { useCashFlowMutationDialogHandler } from './hooks/handlers/useCashFlowMutationDialogHandler'

export const HomeRootContainer = () => {
  const {
    data: cashFlowsData,
    uiState: cashFlowsUiState,
    handlers: cashFlowsHandlers,
  } = useGetCashFlowsHandler()

  const { data: cashFlowMutationDialogData, handlers: cashFlowMutationDialogHandlers } =
    useCashFlowMutationDialogHandler()

  return (
    <HomeRootPresentational
      data={{
        targetMonth: cashFlowsData?.targetMonth ?? new Date(),
        dialogOpenCashFlowId: cashFlowMutationDialogData.dialogOpenCashFlowId,
        cashFlows: cashFlowsData?.cashFlows ?? [],
        summary: cashFlowsData?.summary ?? { income: null, expenses: null, total: null },
        isCreateDialogOpen: cashFlowMutationDialogData.isCreateDialogOpen,
        isUpdateDialogOpen: cashFlowMutationDialogData.isUpdateDialogOpen,
        isDeleteDialogOpen: cashFlowMutationDialogData.isDeleteDialogOpen,
      }}
      uiState={{
        cashFlows: { isLoading: cashFlowsUiState.isLoading, isError: cashFlowsUiState.isError },
      }}
      handlers={{
        onChangeTargetMonth: cashFlowsHandlers.onChangeTargetMonth,
        onSubmitCreateCashFlow: cashFlowMutationDialogHandlers.onSubmitCreateCashFlow,
        onSubmitUpdateCashFlow: cashFlowMutationDialogHandlers.onSubmitUpdateCashFlow,
        onSubmitDeleteCashFlow: cashFlowMutationDialogHandlers.onSubmitDeleteCashFlow,
        setDialogOpenCashFlowId: cashFlowMutationDialogHandlers.setDialogOpenCashFlowId,
        setIsCreateDialogOpen: cashFlowMutationDialogHandlers.setIsCreateDialogOpen,
        setIsUpdateDialogOpen: cashFlowMutationDialogHandlers.setIsUpdateDialogOpen,
        setIsDeleteDialogOpen: cashFlowMutationDialogHandlers.setIsDeleteDialogOpen,
      }}
    />
  )
}
