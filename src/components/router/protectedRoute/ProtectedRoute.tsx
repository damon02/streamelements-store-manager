import * as React from 'react'
import { useLocation, Navigate } from 'react-router-dom'
import { useAuth } from '../../../hooks/useAuth'

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const auth = useAuth()
  const location = useLocation()

  if (!auth?.token && !auth.guestUsername) {
    return <Navigate to="/login" state={{ from: location }} />
  }

  return children
}

export default ProtectedRoute
