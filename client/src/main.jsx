import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ListProvider } from './context/ListContext'
import { AuthProvider } from './context/AuthContext'
import { CardProvider } from './context/CardContext'
import { BoardProvider } from './context/BoardContext'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <BoardProvider>
            <ListProvider>
              <CardProvider>
                <App />
              </CardProvider>
            </ListProvider>
          </BoardProvider>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
)
