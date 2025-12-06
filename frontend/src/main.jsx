import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import CustomRoute from './router'
import './index.css'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CustomRoute />
  </StrictMode>,
)
