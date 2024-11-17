import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ClerkProvider } from '@clerk/clerk-react'
import App from './App.tsx'
import './index.css'
import {QuizContextProvider} from './components/QuizContext.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // default: true
    },
  },
})


const frontendApi = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
console.log('Publishable Key:', frontendApi);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ClerkProvider publishableKey={frontendApi}>
    <QueryClientProvider client={queryClient}>

    <QuizContextProvider>
        <App />
    </QuizContextProvider>
    </QueryClientProvider>
    </ClerkProvider>
  
  </StrictMode>,
)
