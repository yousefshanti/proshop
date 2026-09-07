import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/store'
import './index.css'
import App from './App.tsx'

function applyDesignScale() {
  const width = window.outerWidth || window.innerWidth
  document.documentElement.style.zoom = width < 768 ? '1' : String(Math.min(1, width / 1920))
}
applyDesignScale()
window.addEventListener('resize', applyDesignScale)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </StrictMode>,
)
