import './style.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './itinerary.jsx'

createRoot(document.getElementById('app')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
