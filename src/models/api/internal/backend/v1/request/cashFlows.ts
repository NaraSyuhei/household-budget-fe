import { type CashFlow } from '@/share/types/cashFlow'

export type GetCashFlowsRequestQueryParams = {
  target_month: Date
}

export type CreateCashFlowRequest = {
  amount: number
  title: string
  type: CashFlow
  recordedAt: Date
}

export type UpdateCashFlowRequest = {
  amount: number
  title: string
  type: CashFlow
  recordedAt: Date
}

export type DeleteCashFlowRequestPathParams = {
  id: number
}
