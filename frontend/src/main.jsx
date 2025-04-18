import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const clerkFrontendApi = import.meta.env.VITE_CLERK_FRONTEND_API;

createRoot(document.getElementById('root')).render(

  <ClerkProvider frontendApi={clerkFrontendApi}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ClerkProvider>

)
