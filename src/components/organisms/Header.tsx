import { Box, Container, HStack, Heading } from '@chakra-ui/react'
import { HEADER_HEIGHT } from '@/share/constants/layout/header'

export const Header = () => {
  return (
    <header>
      <Box bg={'teal.500'} h={HEADER_HEIGHT}>
        <Container h='100%'>
          <HStack h={'100%'}>
            <Heading as='h1' size='md' color={'white'}>
              HOUSEHOLD BUDGET APP
            </Heading>
          </HStack>
        </Container>
      </Box>
    </header>
  )
}
