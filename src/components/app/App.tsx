import * as React from 'react'
import { Routes, Route } from 'react-router-dom'

import Home from '../../pages/home/Home'
import LoginPage from '../../pages/login/LoginPage'
import ItemDetails from '../itemDetails/ItemDetails'
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
        >
          <Route path="item/" element={<ItemDetails />}>
            <Route path=":itemId" element={<ItemDetails />} />
          </Route>
        </Route>
        <Route index={false} path="login" element={<LoginPage />} />
      </Routes>
    </div>
  )
}

export default App
