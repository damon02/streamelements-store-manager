import React, { useCallback, useEffect } from 'react'

import Header from '../../components/header/Header'

import { useAuth } from '../../hooks/useAuth'

import './Home.scss'

const Home = () => {
  const { user, setUser, APIService, setToken } = useAuth()
  const memoizedFetchUserDetails = useCallback(fetchUserDetails, [APIService])

  useEffect(() => {
    memoizedFetchUserDetails()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="home">
      <Header user={user} logout={() => setToken(null)} />
      Home
      <i />
    </div>
  )

  async function fetchUserDetails() {
    if (APIService) {
      try {
        const channel = await APIService?.getMeDetails()
        setUser(channel)
      } catch (error) {
        console.error(error)
      }
    }
  }
}

export default Home
