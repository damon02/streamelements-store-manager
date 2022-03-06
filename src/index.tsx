import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'

import App from './components/app/App'
import { AuthProvider } from './hooks/useAuth'
import reportWebVitals from './reportWebVitals'

import 'rc-slider/assets/index.css'
import './style/index.scss'

ReactDOM.render(
  <React.StrictMode>
    <HelmetProvider>
      <HashRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </HashRouter>
    </HelmetProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
