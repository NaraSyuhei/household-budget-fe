import { useState } from 'react'
import { useGetCashFlowsQuery } from '../queries/useGetCashFlowsQuery'

export const useGetCashFlowsHandler = () => {
  const [targetMonth, setTargetMonth] = useState<Date>(new Date())
  const { data, isFetching, isError } = useGetCashFlowsQuery({ target_month: targetMonth })

  const cashFlows = data?.sort((a, b) => b.recordedAt.getTime() - a.recordedAt.getTime()) ?? []

  const income = cashFlows
    .filter((item) => item.type === 'income')
    .reduce((sum, item) => sum + item.amount, 0)

  const expenses = cashFlows
    .filter((item) => item.type === 'expense')
    .reduce((sum, item) => sum + item.amount, 0)

  const total = income - expenses

  const onChangeTargetMonth = (date: Date) => {
    setTargetMonth(date)
  }

  return {
    data: {
      targetMonth,
      cashFlows,
      summary: { income, expenses, total },
    },
    uiState: {
      isLoading: isFetching,
      isError: isError,
    },
    handlers: {
      onChangeTargetMonth,
    },
  }
}
