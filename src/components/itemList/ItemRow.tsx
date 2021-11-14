import * as React from 'react'
import { StreamElements } from '../../@types/types'

interface IProps {
  item: StreamElements.ChannelItem
}

const ItemRow = ({ item }: IProps) => {
  const [playing, setPlaying] = React.useState<boolean>(false)

  return (
    <tr className="item" key={item._id}>
      <td className="checkbox" />
      <td className="play">
        <div
          className="play-button"
          role="button"
          tabIndex={0}
          onKeyPress={e => {
            e.preventDefault()
            e.stopPropagation()
            if (e.key === 'ENTER') {
              if (item.alert?.audio?.src && !playing) {
                playSound(item.alert?.audio?.src)
              }
            }
          }}
          onClick={e => {
            e.preventDefault()
            e.stopPropagation()
            if (item.alert?.audio?.src && !playing) {
              playSound(item.alert?.audio?.src)
            }
          }}
        >
          <i className={playing ? 'fas fa-pause' : 'fas fa-play'} />
        </div>
      </td>
      <td className="sound-name">{item.bot?.identifier}</td>
      <td className="cost">{item.cost}</td>
      <td className="volume">{Math.round((item.alert?.audio?.volume || 0) * 100)}%</td>
      <td className="check enabled">
        <i className={item.enabled ? 'fas fa-check' : 'fas fa-times'} />
      </td>
      <td className="check subs-only">
        <i className={item.subscriberOnly ? 'fas fa-check' : 'fas fa-times'} />
      </td>
    </tr>
  )

  async function playSound(soundFile: string, volume: number = 1.0) {
    const sound = new Audio(soundFile)
    sound.volume = volume
    setPlaying(true)
    try {
      await sound.play()
      const length = sound.duration
      setTimeout(() => setPlaying(false), length * 1000)
    } catch (error) {
      console.error(error)
    }
  }
}

export default ItemRow
