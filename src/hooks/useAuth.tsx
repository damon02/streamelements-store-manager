import React from 'react'
import APIService, { APIServiceProps } from '../services/APIService'
import { useLocalStorage } from './useLocalStorage'
import { StreamElements } from '../@types/types'

interface AuthContextType {
  user?: StreamElements.Channel
  setUser: (user: StreamElements.Channel) => void
  token: string | null
  setToken: (token: string | null) => void
  guestUsername: string | null
  setGuestUsername: (id: string | null) => void
  APIService: APIServiceProps | null
}

const AuthContext = React.createContext<AuthContextType>(null!)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<StreamElements.Channel>()
  const [guestUsername, setGuestUsername] = useLocalStorage<string | null>(
    'StreamElementsGuestUsername',
    null
  )
  const [token, setToken] = useLocalStorage<string | null>('StreamElementsJWT', null)

  const tokenizedAPIService = token
    ? APIService(`Bearer ${token}`)
    : guestUsername
    ? APIService(undefined)
    : null

  const value = {
    user,
    setUser,
    token,
    setToken,
    guestUsername,
    setGuestUsername,
    APIService: tokenizedAPIService
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return React.useContext(AuthContext)
}
