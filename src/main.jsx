import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { getDataStore } from './Redux/getDataStore.jsx'
import "@fontsource/poppins"; // Defaults to 400 weight
import "@fontsource/poppins/300.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import "@fontsource/poppins/800.css";
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={getDataStore}>
      <App />
    </Provider>

  </StrictMode>,
)
