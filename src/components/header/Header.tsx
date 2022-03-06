import * as React from 'react'
import { animated, useSpring } from 'react-spring'
import { easeQuadInOut } from 'd3-ease'
import { format } from 'date-fns'

import { EditedChannelItem, StreamElements } from '../../@types/types'
import './Header.scss'

interface IProps {
  user?: StreamElements.Channel
  loading: boolean
  guestUsername: string | null
  logout: () => void
  allItems: EditedChannelItem[]
}

const Header = ({ user, loading, guestUsername, logout, allItems }: IProps) => {
  const [showMenu, setShowMenu] = React.useState<boolean>(false)

  const username = user?.displayName

  const menuAnimationProps = useSpring({
    opacity: showMenu ? 1 : 0,
    transform: showMenu
      ? 'translateY(0%) translateX(0%) scale(1)'
      : 'translateY(-100%) translateX(50%) scale(0)',
    config: { duration: 250, easing: easeQuadInOut }
  })

  return (
    <div className={`header-app${guestUsername ? ' guest-mode' : ''}`}>
      <div className="title">
        <h1>StreamElements Sounds editor</h1>
        {guestUsername && <div className="guest">Guest mode</div>}
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
          {user?.isPartner ? (
            <div className="partner-badge">
              <i className="fas fa-check" />
            </div>
          ) : null}
          <div className="triangle">
            <i className="fas fa-caret-down" />
          </div>
        </div>
      </div>
      <animated.div className="user-menu" style={{ ...menuAnimationProps }}>
        <button className="button-menu" type="button" onClick={() => copyToClipboardCSV()}>
          Copy all items to clipboard
        </button>
        <button className="button-menu danger" type="button" onClick={() => logout()}>
          Log out
        </button>
      </animated.div>
    </div>
  )

  function copyToClipboardCSV() {
    const text = `Command;Name;Description;Cost;Date added\n${allItems
      .filter(i => i.enabled)
      .map(
        item =>
          `${item.bot?.identifier};${item.name || '<empty name>'};${
            item.description || '<empty description>'
          };${item.cost || 0};${
            item.createdAt
              ? format(new Date(item.createdAt), 'dd-MM-yyyy HH:mm:ss')
              : '<empty createdAt>'
          };`
      )
      .join('\n')}`

    navigator.clipboard.writeText(text)
    setShowMenu(false)
  }
}

export default Header
