import { Card } from '@chakra-ui/react'

interface CashFlowSummaryCardProps {
  title: string
  amount: number | null
}

export const CashFlowSummaryCard = ({ title, amount }: CashFlowSummaryCardProps) => {
  return (
    <>
      <Card.Root minW={'2xs'}>
        <Card.Header p={2} fontSize={'sm'} bg={'teal.100'}>
          {title}
        </Card.Header>
        <Card.Body>{amount !== null ? `${amount} 円` : 'N/A'}</Card.Body>
      </Card.Root>
    </>
  )
}
