import { format } from 'date-fns'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import pjson from '../../../package.json'
import Title from '../../components/title/Title'
import { useAuth } from '../../hooks/useAuth'
import { queryStringToObject } from '../../utils/general'

import './LoginPage.scss'

const LoginPage = () => {
  const {
    token,
    setToken,
    guestUsername: guestUserId,
    setGuestUsername: setGuestUserId
  } = useAuth()
  const navigate = useNavigate()
  const query = useLocation()
  const queryObject = queryStringToObject(query.search)

  const [jwt, setJWT] = useState<string>('')
  const [username, setUsername] = useState<string>('')

  useEffect(() => {
    if (token || guestUserId) {
      navigate('/')
    }

    if (queryObject.channel) {
      setGuestUserId(queryObject.channel)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (guestUserId) {
      navigate('/')
    }
  }, [guestUserId, navigate])

  return (
    <div className="login-page">
      <Title titleItems={['Login']} />
      <h1 className="page-title">StreamElements Sounds manager</h1>
      <div className="content-split">
        <div className="block guest-mode">
          <h2>Guest mode</h2>
          <p>View and listen to all your favourite stream sounds without logging in</p>
          <button className="guest-button" type="button" onClick={() => setGuestUserId('ONSCREEN')}>
            <div className="image-username">
              <div
                className="user-image"
                style={{
                  backgroundImage: `url(https://static-cdn.jtvnw.net/jtv_user_pictures/3abf196b-0d2f-44f3-93b2-e5121219899f-profile_image-300x300.png)`
                }}
              />
              <div className="username">ONSCREEN</div>
            </div>
            <i className="icon fas fa-arrow-right" />
          </button>
          <form className="guest-input" onSubmit={() => setGuestUserId(username)}>
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="Twitch username"
            />
            <button type="button" onClick={() => setGuestUserId(username)}>
              Continue as guest
            </button>
          </form>
        </div>
        <div className="block login-block">
          <h2>Manage mode</h2>
          <div className="info-box warning">
            <div className="header">
              <i className="fas fa-info-circle" />
              <span>Information</span>
            </div>
            <div className="content">
              <p>To edit sounds the tool needs your JWT (JSON web token).</p>
              <p>
                You can find this by logging into StreamElements, clicking your image in the top
                right, then your username and lastly Channel Settings.
              </p>
              <p>
                Then toggle the "Show secrets" button, and copy the JWT in full inside the input
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
              placeholder="JWT (JSON web token)"
            />
            <div className="buttons">
              <button type="submit">Login</button>
              <button
                className="secondary"
                type="button"
                onClick={() =>
                  window.open('https://streamelements.com/dashboard/account/channels', '_blank')
                }
              >
                <i className="icon fas fa-external-link-square-alt" />
                StreamElements Channel Settings
              </button>
            </div>
          </form>
        </div>
        <div className="copy">
          <div className="who">&copy; damon02 - {format(new Date(), 'yyyy')}</div>
          <div className="version">v{pjson.version}</div>
        </div>
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
