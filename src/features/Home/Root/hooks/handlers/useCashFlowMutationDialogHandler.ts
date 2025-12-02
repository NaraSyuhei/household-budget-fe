import { useState } from 'react'
import { toaster } from '@/components/ui/toaster'

import { useCreateCashFlowMutation } from '../mutations/useCreateCashFlowMutation'
import { useUpdateCashFlowMutation } from '../mutations/useUpdateCashFlowMutation'
import { useDeleteCashFlowMutation } from '../mutations/useDeleteCashFlowMutation'
import { type CashFlowItemView } from '../../types/CashFlowItemView'
import {
  type CreateCashFlowRequest,
  type UpdateCashFlowRequest,
  type DeleteCashFlowRequestPathParams,
} from '@/models/api/internal/backend/v1/request/cashFlows'

export const useCashFlowMutationDialogHandler = () => {
  const [dialogOpenCashFlowId, setDialogOpenCashFlowId] = useState<number | null>(null)

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const { mutateAsync: createCashFlow } = useCreateCashFlowMutation()
  const { mutateAsync: updateCashFlow } = useUpdateCashFlowMutation()
  const { mutateAsync: deleteCashFlow } = useDeleteCashFlowMutation()

  const onSubmitCreateCashFlow = async (data: CashFlowItemView) => {
    const requestData: CreateCashFlowRequest = {
      amount: data.amount,
      title: data.title,
      type: data.type,
      recordedAt: data.recordedAt,
    }

    try {
      await createCashFlow(requestData)

      toaster.success({
        title: 'Cash flow created successfully.',
      })
    } catch (error) {
      toaster.error({
        title: 'Failed to create cash flow.',
        description: 'Please try again later.',
      })
    }
  }

  const onSubmitUpdateCashFlow = async (data: CashFlowItemView) => {
    if (data.id === undefined) {
      toaster.error({
        title: 'Invalid cash flow ID.',
      })
      return
    }
    const requestData: UpdateCashFlowRequest = {
      amount: data.amount,
      title: data.title,
      type: data.type,
      recordedAt: data.recordedAt,
    }

    try {
      await updateCashFlow({ id: data.id, data: requestData })

      toaster.success({
        title: 'Cash flow updated successfully.',
      })
    } catch (error) {
      toaster.error({
        title: 'Failed to update cash flow.',
        description: 'Please try again later.',
      })
    }
  }

  const onSubmitDeleteCashFlow = async (data: CashFlowItemView) => {
    const params: DeleteCashFlowRequestPathParams = { id: data.id! }

    try {
      await deleteCashFlow(params)

      toaster.success({
        title: 'Cash flow deleted successfully.',
      })
    } catch (error) {
      toaster.error({
        title: 'Failed to delete cash flow.',
        description: 'Please try again later.',
      })
    }
  }

  return {
    data: {
      dialogOpenCashFlowId,
      isCreateDialogOpen,
      isUpdateDialogOpen,
      isDeleteDialogOpen,
    },
    handlers: {
      onSubmitCreateCashFlow,
      onSubmitUpdateCashFlow,
      onSubmitDeleteCashFlow,
      setDialogOpenCashFlowId,
      setIsCreateDialogOpen,
      setIsUpdateDialogOpen,
      setIsDeleteDialogOpen,
    },
  }
}
