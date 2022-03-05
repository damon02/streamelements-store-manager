import React, { useState } from 'react'
import { easeQuadInOut } from 'd3-ease'
import { animated, useSpring } from 'react-spring'

import { APIServiceProps } from '../../services/APIService'
import './DeletePrompt.scss'
import { useOnClickOutside } from '../../hooks/useOnClickOutside'

interface IProps {
  api: APIServiceProps | null
  channelId?: string
  itemId?: string
  showPrompt: boolean
  setShowPrompt: (val: boolean) => void
  onDelete: () => void
}

const DeletePrompt = ({ api, channelId, itemId, showPrompt, setShowPrompt, onDelete }: IProps) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | undefined>()

  const menuAnimationProps = useSpring({
    opacity: showPrompt ? 1 : 0,
    transform: showPrompt ? 'scale(1)' : 'scale(0)',
    config: { duration: 250, easing: easeQuadInOut }
  })

  const ref = React.useRef<HTMLDivElement>(null)
  useOnClickOutside(ref, () => setShowPrompt(false))

  return (
    <animated.div className="delete-background" style={{ ...menuAnimationProps }}>
      <animated.div className="delete-inner" style={{ ...menuAnimationProps }} ref={ref}>
        {error && <div className="error">{error}</div>}
        <div className="are-you-sure">Are you sure you want to delete this sound?</div>
        <div className="buttons">
          <button
            className="button-menu danger"
            type="button"
            disabled={loading}
            onClick={() => handleDeleteSound()}
          >
            {loading ? <i className="fas fa-spin fa-circle-notch" /> : 'Delete sound'}
          </button>
          <button
            className="button-menu secondary"
            type="button"
            onClick={() => setShowPrompt(false)}
          >
            No
          </button>
        </div>
      </animated.div>
    </animated.div>
  )

  async function handleDeleteSound() {
    if (!channelId || !itemId) {
      setError('Channel ID or Item ID is missing')
      return
    }

    try {
      setLoading(true)
      setError(undefined)

      await api?.deleteChannelItem(channelId, itemId)
      onDelete()
    } catch (err) {
      console.error(err)
      setError('An unknown error occurred while trying to communicate to StreamElements :(')
    } finally {
      setLoading(false)
    }
  }
}

export default DeletePrompt
