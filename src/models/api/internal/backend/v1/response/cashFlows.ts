import { type CashFlow } from '@/share/types/cashFlow'

export type GetCashFlowsResponseItem = {
  id: number
  amount: number
  title: string
  type: CashFlow
  recordedAt: Date
}

export type CreateCashFlowResponse = {
  id: number
  amount: number
  title: string
  type: CashFlow
  recorded_at: Date
}

export type UpdateCashFlowResponse = {
  id: number
  amount: number
  title: string
  type: CashFlow
  recorded_at: Date
}
