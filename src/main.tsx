import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/store'
import './index.css'
import App from './App.tsx'

// Design was built at a fixed 1920px canvas (all font-sizes/paddings are literal px from XD).
// Scale the page to fit narrower windows using the actual window frame size (outerWidth),
// which browser zoom (Ctrl/Cmd +/-) doesn't change — unlike vw, so this doesn't fight zoom.
// Below the md breakpoint (phones/small tablets) this is turned off entirely: CSS `zoom`
// changes the effective viewport that Tailwind's responsive classes (sm:/md:) evaluate
// against, so scaling there would make phones render a shrunk-down desktop layout instead
// of the real mobile layout. Phones get true 1:1 rendering using the mobile-sized classes.
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
