import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./index.css"
import router from './router';
import { RouterProvider } from "react-router/dom";
import { HelmetProvider } from 'react-helmet-async';

import {

  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </HelmetProvider>
  </StrictMode>,
)
