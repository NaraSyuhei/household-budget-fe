import { type CashFlow } from '@/share/types/cashFlow'

export type CashFlowItemView = {
  id?: number
  amount: number
  title: string
  type: CashFlow
  recordedAt: Date
}
