import { Tabs } from '@chakra-ui/react'
import { GiPayMoney, GiReceiveMoney } from 'react-icons/gi'

import { type CashFlowItemView } from '@/features/Home/Root/types/CashFlowItemView'
import { CashFlowsTable } from '@/features/Home/Root/ui/CashFlowsTable/CashFlowsTable'

interface CashFlowsBrakedownTabProps {
  children: {
    updateDialog: (item: CashFlowItemView) => React.ReactNode
    deleteDialog: (item: CashFlowItemView) => React.ReactNode
  }
  data: {
    cashFlows: CashFlowItemView[]
  }
  uiState: {
    cashFlows: {
      isLoading: boolean
      isError: boolean
    }
  }
}

export const CashFlowsBrakedownTab = ({ children, data }: CashFlowsBrakedownTabProps) => {
  const tabData = [
    {
      label: 'Income',
      value: 'income',
      icon: GiReceiveMoney,
      targetData: data?.cashFlows.filter((item) => item.type === 'income'),
    },
    {
      label: 'Expenses',
      value: 'expenses',
      icon: GiPayMoney,
      targetData: data?.cashFlows.filter((item) => item.type === 'expense'),
    },
  ]

  return (
    <>
      <Tabs.Root defaultValue='income' variant={'outline'} w={'100%'}>
        <Tabs.List>
          {tabData.map((tab) => (
            <Tabs.Trigger key={tab.value} value={tab.value} display='flex' alignItems='center'>
              <tab.icon style={{ marginRight: '8px' }} />
              {tab.label} ({tab.targetData.length})
            </Tabs.Trigger>
          ))}
        </Tabs.List>

        {tabData.map((tab) => (
          <Tabs.Content key={tab.value} value={tab.value} mt={4}>
            <CashFlowsTable
              children={{
                updateDialog: children.updateDialog,
                deleteDialog: children.deleteDialog,
              }}
              data={{ cashFlows: tab.targetData }}
              uiState={{ cashFlows: { isloading: false, isError: false } }}
            />
          </Tabs.Content>
        ))}
      </Tabs.Root>
    </>
  )
}
