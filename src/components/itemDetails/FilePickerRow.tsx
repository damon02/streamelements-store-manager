import * as React from 'react'
import { format } from 'date-fns'

import { StreamElements } from '../../@types/types'

interface IProps {
  item: StreamElements.UploadedFile
  selectedFile: StreamElements.UploadedFile | undefined
  handleOnClick: (item: StreamElements.UploadedFile) => void
}

const FilePickerRow = ({ item, selectedFile, handleOnClick }: IProps) => {
  const [playing, setPlaying] = React.useState(false)

  return (
    <tr
      className={`file-row${selectedFile?._id === item._id ? ' active' : ''}`}
      key={item._id}
      onClick={() => handleOnClick(item)}
    >
      <td className="play">
        <div
          className="play-button"
          role="button"
          tabIndex={0}
          onKeyPress={e => {
            e.preventDefault()
            e.stopPropagation()
            if (e.key === 'ENTER') {
              if (item.url) {
                playSound(item.url)
              }
            }
          }}
          onClick={e => {
            e.preventDefault()
            e.stopPropagation()
            if (item.url) {
              playSound(item.url)
            }
          }}
        >
          <i className={playing ? 'fas fa-pause' : 'fas fa-play'} />
        </div>
      </td>
      <td className="sound-name">{item.name}</td>
      <td className="dateCreated center">
        <div>{item.createdAt && format(new Date(item.createdAt), 'dd-MM-yyyy')}</div>
        <div>{item.createdAt && format(new Date(item.createdAt), 'HH:mm:ss')}</div>
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

export default React.memo(FilePickerRow)
