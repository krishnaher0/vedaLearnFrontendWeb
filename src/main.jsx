import React,{ StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AuthContextProvider from './auth/AuthProvider'
import {QueryClient,QueryClientProvider} from '@tanstack/react-query'
import AppRouter from './router/AppRouter'
import {Slide, ToastContainer} from 'react-toastify'
const queryClient=new QueryClient()


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
      <QueryClientProvider client={queryClient}>
        <AppRouter/>
        <ToastContainer
        position='top-center'
        autoClose={2000}
          hideProgressBar={false}
          theme="light"
          transition={Slide}
        />
      </QueryClientProvider>

    </AuthContextProvider>
    
    
  </StrictMode>,
)
