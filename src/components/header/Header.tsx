import * as React from 'react'
import { animated, useSpring } from 'react-spring'
import { easeQuadInOut } from 'd3-ease'

import { StreamElements } from '../../@types/types'
import './Header.scss'

interface IProps {
  user?: StreamElements.Channel
  logout: () => void
}

const Header = ({ user, logout }: IProps) => {
  const [showMenu, setShowMenu] = React.useState<boolean>(false)

  const username = user?.displayName

  const animationProps = useSpring({
    opacity: showMenu ? 1 : 0,
    transform: showMenu
      ? 'translateY(0%) translateX(0%) scale(1)'
      : 'translateY(-100%) translateX(50%) scale(0)',
    config: { duration: 250, easing: easeQuadInOut }
  })

  return (
    <div className="header-app">
      <div className="title">
        <h1>StreamElements Sounds editor</h1>
      </div>
      <div className="buttons">
        <div
          className={`button-user${showMenu ? ' active' : ''}`}
          role="button"
          onKeyPress={e => (e.key === 'enter' ? setShowMenu(!showMenu) : {})}
          onClick={() => setShowMenu(!showMenu)}
          tabIndex={0}
        >
          <div className="user-image" style={{ backgroundImage: `url(${user?.avatar})` }} />
          <div className="name">{username || <i className="fas fa-spin fa-spinner" />}</div>
          <div className="triangle">
            <i className="fas fa-caret-down" />
          </div>
        </div>
      </div>
      <animated.div className="user-menu" style={{ ...animationProps }}>
        <button className="button-menu danger" type="button" onClick={() => logout()}>
          Log out
        </button>
      </animated.div>
    </div>
  )
}

export default Header
