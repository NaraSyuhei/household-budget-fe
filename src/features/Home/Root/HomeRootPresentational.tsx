import { Container, VStack, HStack, Text } from '@chakra-ui/react'

import { MonthYearPicker } from '@/components/atoms/MonthYearPicker'
import { CashFlowMutationDialog } from './ui/CashFlowMutationDialog'
import { CashFlowsBrakedownTab } from '@/features/Home/Root/ui/CashFlowsBrakedownTab'
import { CashFlowSummaryCard } from '@/features/Home/Root/ui/CashFlowSummaryCard'
import { type CashFlowItemView } from './types/CashFlowItemView'

// ContainerはPresentationalのUIを知らない前提で実装する
interface HomeRootPresentationalProps {
  data: {
    targetMonth: Date
    dialogOpenCashFlowId: number | null
    cashFlows: CashFlowItemView[]
    summary: {
      income: number | null
      expenses: number | null
      total: number | null
    }
    isCreateDialogOpen: boolean
    isUpdateDialogOpen: boolean
    isDeleteDialogOpen: boolean
  }
  uiState: {
    // API毎にまとめておくと良い
    cashFlows: {
      isLoading: boolean
      isError: boolean
    }
  }
  handlers: {
    onChangeTargetMonth: (date: Date) => void
    onSubmitCreateCashFlow: (item: CashFlowItemView) => Promise<void>
    onSubmitUpdateCashFlow: (item: CashFlowItemView) => Promise<void>
    onSubmitDeleteCashFlow: (item: CashFlowItemView) => Promise<void>
    setDialogOpenCashFlowId: (id: number | null) => void
    setIsCreateDialogOpen: (isOpen: boolean) => void
    setIsUpdateDialogOpen: (isOpen: boolean) => void
    setIsDeleteDialogOpen: (isOpen: boolean) => void
  }
}

export const HomeRootPresentational = ({
  data,
  uiState,
  handlers,
}: HomeRootPresentationalProps) => {
  return (
    <>
      <Container maxW='container.lg' py={8}>
        <VStack w={'100%'} gap={8}>
          <HStack w={'100%'} justifyContent='space-between'>
            <MonthYearPicker
              targetDate={data.targetMonth}
              onChangeDate={handlers.onChangeTargetMonth}
            />
          </HStack>
          <HStack w={'100%'}>
            <CashFlowSummaryCard title='income' amount={data.summary.income} />
            <Text> - </Text>
            <CashFlowSummaryCard title='expenses' amount={data.summary.expenses} />
            <Text> = </Text>
            <CashFlowSummaryCard title='TOTAL' amount={data.summary.total} />
          </HStack>

          <HStack w={'100%'} justifyContent='space-between'>
            <CashFlowMutationDialog
              data={{
                isDialogOpen: data.isCreateDialogOpen,
                mutateType: 'create',
                dialogOpenCashFlowId: data.dialogOpenCashFlowId,
                dialogTitle: 'Create Cash Flow',
                triggerButtonText: '+ Add',
                submitButtonText: 'Submit',
                initialData: undefined,
              }}
              handlers={{
                onSubmit: handlers.onSubmitCreateCashFlow,
                setDialogOpenCashFlowId: handlers.setDialogOpenCashFlowId,
                onChangeTargetMonth: handlers.onChangeTargetMonth,
                setIsDialogOpen: handlers.setIsCreateDialogOpen,
              }}
            />
          </HStack>

          <CashFlowsBrakedownTab
            children={{
              updateDialog: (item: CashFlowItemView) => (
                <CashFlowMutationDialog
                  data={{
                    isDialogOpen: data.isUpdateDialogOpen,
                    mutateType: 'update',
                    dialogOpenCashFlowId: data.dialogOpenCashFlowId,
                    dialogTitle: 'Update Cash Flow',
                    triggerButtonText: 'Edit',
                    submitButtonText: 'Edit',
                    initialData: item,
                  }}
                  handlers={{
                    setIsDialogOpen: handlers.setIsUpdateDialogOpen,
                    setDialogOpenCashFlowId: handlers.setDialogOpenCashFlowId,
                    onSubmit: handlers.onSubmitUpdateCashFlow,
                    onChangeTargetMonth: handlers.onChangeTargetMonth,
                  }}
                />
              ),
              deleteDialog: (item: CashFlowItemView) => (
                <CashFlowMutationDialog
                  data={{
                    isDialogOpen: data.isDeleteDialogOpen,
                    mutateType: 'delete',
                    dialogOpenCashFlowId: data.dialogOpenCashFlowId,
                    dialogTitle: 'Delete Cash Flow',
                    triggerButtonText: 'Delete',
                    submitButtonText: 'Delete',
                    initialData: item,
                  }}
                  handlers={{
                    setIsDialogOpen: handlers.setIsDeleteDialogOpen,
                    setDialogOpenCashFlowId: handlers.setDialogOpenCashFlowId,
                    onSubmit: handlers.onSubmitDeleteCashFlow,
                    onChangeTargetMonth: handlers.onChangeTargetMonth,
                  }}
                />
              ),
            }}
            data={{ cashFlows: data.cashFlows }}
            uiState={{ cashFlows: uiState.cashFlows }}
          />
        </VStack>
      </Container>
    </>
  )
}
