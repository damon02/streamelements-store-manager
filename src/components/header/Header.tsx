import * as React from 'react'
import { animated, useSpring } from 'react-spring'
import { easeQuadInOut } from 'd3-ease'
import { saveAs } from 'file-saver'
import JSZip from 'jszip'

import { useOnClickOutside } from '../../hooks/useOnClickOutside'
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

  const ref = React.useRef<HTMLDivElement>(null)
  useOnClickOutside(ref, () => setShowMenu(false))

  return (
    <div className={`header-app${guestUsername ? ' guest-mode' : ''}`}>
      <div className="title">
        <h1>StreamElements Sounds editor</h1>
        {guestUsername ? (
          <div className="guest">Guest mode</div>
        ) : (
          <div className="account">Editor mode</div>
        )}
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
      <animated.div className="user-menu" style={{ ...menuAnimationProps }} ref={ref}>
        <button className="button-menu" type="button" onClick={() => copyToClipboardCSV()}>
          Copy all items to clipboard
        </button>
        <button
          className="button-menu"
          type="button"
          onClick={() =>
            window.open(`https://github.com/damon02/streamelements-store-manager`, '_blank')
          }
        >
          <i className="icon fab fa-github" />
          View on GitHub
        </button>
        <button className="button-menu danger" type="button" onClick={() => logout()}>
          <i className="icon fas fa-sign-out-alt" />
          Log out
        </button>
      </animated.div>
    </div>
  )

  async function copyToClipboardCSV() {
    const urlNameMap = allItems.map(i => ({
      name: i.bot?.identifier || 'null',
      url: i.alert?.audio?.src || ''
    }))
    const zip = new JSZip()

    await Promise.all(urlNameMap.map(x => downloadAsBlob(zip, x.name, x.url)))

    zip.generateAsync({ type: 'blob' }).then(c => saveAs(c, 'sounds.zip'))
  }

  async function downloadAsBlob(zipFile: JSZip, name: string, url: string) {
    try {
      const fileType = url.split('.').reverse()[0]
      const blob = await (await fetch(url)).blob()
      zipFile.file(`${name}.${fileType}`, blob)
    } catch (error) {
      console.error(error)
    }
  }
}

export default Header
