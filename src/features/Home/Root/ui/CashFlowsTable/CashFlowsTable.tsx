import { Table, Show, Box, Spinner, Text, Alert } from '@chakra-ui/react'
import { type CashFlowItemView } from '@/features/Home/Root/types/CashFlowItemView'

interface CashFlowsTableProps {
  children: {
    updateDialog: (item: CashFlowItemView) => React.ReactNode
    deleteDialog: (item: CashFlowItemView) => React.ReactNode
  }
  data: {
    cashFlows: CashFlowItemView[]
  }
  uiState: {
    cashFlows: {
      isloading: boolean
      isError: boolean
    }
  }
}

export const CashFlowsTable = ({ children, data, uiState }: CashFlowsTableProps) => {
  return (
    <>
      <Show when={uiState.cashFlows.isloading}>
        <Box w={'100%'} textAlign='center'>
          <Spinner color={'teal.500'} />
          <Text color={'teal.500'}>Loading...</Text>
        </Box>
      </Show>

      <Show when={uiState.cashFlows.isError}>
        <Alert.Root status='error'>
          <Alert.Indicator />
          <Alert.Title>Failed to load cash flows. Please try again later.</Alert.Title>
        </Alert.Root>
      </Show>

      <Show when={!uiState.cashFlows.isloading && !uiState.cashFlows.isError}>
        <Table.Root variant={'outline'}>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader w={'20%'}>Date</Table.ColumnHeader>
              <Table.ColumnHeader w={'30%'}>Title</Table.ColumnHeader>
              <Table.ColumnHeader w={'30%'}>Amount</Table.ColumnHeader>
              <Table.ColumnHeader w={'10%'}></Table.ColumnHeader>
              <Table.ColumnHeader w={'10%'}></Table.ColumnHeader>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {data.cashFlows.map((item, idx) => (
              <Table.Row key={item.id !== undefined ? item.id.toString() : `row-${idx}`}>
                <Table.Cell>{item.recordedAt.toLocaleDateString()}</Table.Cell>
                <Table.Cell>{item.title}</Table.Cell>
                <Table.Cell>{String(item.amount)}</Table.Cell>
                <Table.Cell>{children.updateDialog(item)}</Table.Cell>
                <Table.Cell>{children.deleteDialog(item)}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Show>
    </>
  )
}
