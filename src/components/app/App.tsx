import * as React from 'react'
import { Routes, Route } from 'react-router-dom'

import Home from '../../pages/home/Home'
import LoginPage from '../../pages/login/LoginPage'
import ProtectedRoute from '../router/protectedRoute/ProtectedRoute'

import { useAuth } from '../../hooks/useAuth'

import './App.scss'

function App() {
  const { APIService, token, setToken } = useAuth()

  return (
    <div className="App">
      <h1>App</h1>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home APIService={APIService} />
            </ProtectedRoute>
          }
        />
        <Route
          index={false}
          path="login"
          element={<LoginPage token={token} setToken={setToken} />}
        />
      </Routes>
    </div>
  )
}

export default App
