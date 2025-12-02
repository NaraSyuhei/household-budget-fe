import { type CashFlow } from '@/share/types/cashFlow'

export const transformCashFlowJa = (type: CashFlow): string => {
  switch (type) {
    case 'income':
      return '収入'
    case 'expense':
      return '支出'
    default:
      return ''
  }
}
