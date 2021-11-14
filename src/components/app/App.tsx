import * as React from 'react'
import { Routes, Route } from 'react-router-dom'

import Home from '../../pages/home/Home'
import LoginPage from '../../pages/login/LoginPage'
import ProtectedRoute from '../router/protectedRoute/ProtectedRoute'

import './App.scss'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route index={false} path="login" element={<LoginPage />} />
      </Routes>
    </div>
  )
}

export default App
