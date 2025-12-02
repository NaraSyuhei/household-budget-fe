import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider as ChakraProvider } from '@/components/ui/provider'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/core/queryClient'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </QueryClientProvider>
    </ChakraProvider>
  </StrictMode>,
)
