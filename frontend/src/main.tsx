import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ProviderWrapper from './middleware/wrappers/ProviderWrapper'
import App from './App'

createRoot(document.getElementById('root')!).render(
    <ProviderWrapper>
      <App />
    </ProviderWrapper>,
)
