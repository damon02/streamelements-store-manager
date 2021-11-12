import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import pjson from '../../../package.json'

import './LoginPage.scss'

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
      navigate('/')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="login-page">
      <h1 className="page-title">ONSCREEN sounds editor</h1>
      <div className="login-block">
        <div className="info-box warning">
          <div className="header">
            <i className="fas fa-info-circle" />
            <span>Information</span>
          </div>
          <div className="content">
            <p>To manage sounds the tool needs your JWT (JSON web token).</p>
            <p>
              You can find this by logging into StreamElements, clicking your image in the top
              right, then your username and lastly Channel Settings.
            </p>
            <p>
              Then toggle the "Show secrets" button, and copy the JWT token in full inside the input
              field.
            </p>
          </div>
          <div className="footer">
            <span>Do not share this token!</span>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={jwt}
            onChange={e => setJWT(e.target.value)}
            placeholder="JWT Token"
          />
          <button type="submit">Login</button>
        </form>
      </div>
      <div className="copy">
        <div className="who">&copy; damon02 - 2021</div>
        <div className="version">v{pjson.version}</div>
      </div>
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
