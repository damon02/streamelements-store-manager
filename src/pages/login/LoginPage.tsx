import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface IProps {
  token: string | null
  setToken: (token: string) => void
}

const LoginPage = (props: IProps) => {
  const navigate = useNavigate()

  const { token, setToken } = props
  const [jwt, setJWT] = useState<string>('')

  useEffect(() => {
    if (token) {
      console.log('Already logged in', token)
      navigate('/')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="login-page">
      <div className="page-title">Hello</div>
      <form onSubmit={handleSubmit}>
        <input value={jwt} onChange={e => setJWT(e.target.value)} placeholder="JWT Token" />
        <button type="submit">Login</button>
      </form>
    </div>
  )

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    setToken(jwt)
    setJWT('')

    navigate('/')
  }
}

export default LoginPage
