import * as React from 'react'
import { WaveSurfer, WaveForm } from 'wavesurfer-react'
import { format } from 'date-fns'
import { useNavigate } from 'react-router-dom'

import { EditedChannelItem } from '../../@types/types'
import { usePrevious } from '../../hooks/usePrevious'

interface IProps {
  item: EditedChannelItem
  setItem: (item: EditedChannelItem) => void
}

const ItemRow = ({ item, setItem }: IProps) => {
  const navigate = useNavigate()
  const [hasCopiedToClipboard, setHasCopied] = React.useState(false)

  const previousSource = usePrevious(item.alert?.audio?.src)

  const id = `waveform-${item._id}`
  const wavesurferRef = React.useRef<any>(null)

  const [playing, setPlaying] = React.useState(false)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [playPosition, setPlayPosition] = React.useState(0)
  const [waveformInitialized, setInitialized] = React.useState(false)
  const handleWSMount = React.useCallback(
    waveSurfer => {
      wavesurferRef.current = waveSurfer

      if (wavesurferRef.current && item.alert?.audio?.src) {
        wavesurferRef.current.load(item.alert?.audio?.src)

        wavesurferRef.current.on('play', () => {
          setPlaying(true)
        })

        wavesurferRef.current.on('pause', () => {
          setPlaying(false)
        })

        wavesurferRef.current.on('finish', () => {
          setPlaying(false)
        })

        wavesurferRef.current.on('seek', () => {
          setPlayPosition(wavesurferRef.current.getCurrentTime())
        })

        wavesurferRef.current.on('audioprocess', () => {
          setPlayPosition(wavesurferRef.current.getCurrentTime())
        })

        setInitialized(true)
      }
    },
    [item.alert?.audio?.src]
  )

  const play = React.useCallback(() => {
    wavesurferRef.current.playPause()
  }, [])

  React.useEffect(() => {
    if (
      waveformInitialized &&
      previousSource !== item.alert?.audio?.src &&
      item.alert?.audio?.src
    ) {
      wavesurferRef.current.load(item.alert?.audio?.src)
    }
  }, [item.alert?.audio?.src, previousSource, waveformInitialized])

  React.useEffect(() => {
    if (wavesurferRef.current) {
      wavesurferRef.current.setVolume(item.alert?.audio?.volume)
    }
  }, [item.alert?.audio?.volume])

  React.useEffect(() => {
    if (hasCopiedToClipboard) {
      setTimeout(() => setHasCopied(false), 1000)
    }
  }, [hasCopiedToClipboard])

  return (
    <tr
      className={`item${!item.enabled ? ' disabled' : ''}`}
      key={item._id}
      onClick={() => navigate(`item/${item._id}`)}
    >
      <td className="play">
        <div
          className="inline-button"
          role="button"
          tabIndex={0}
          onKeyPress={e => {
            e.preventDefault()
            e.stopPropagation()
            if (e.key === 'ENTER') {
              if (item.alert?.audio?.src) {
                play()
              }
            }
          }}
          onClick={e => {
            e.preventDefault()
            e.stopPropagation()
            if (item.alert?.audio?.src) {
              play()
            }
          }}
        >
          <i className={playing ? 'fas fa-pause' : 'fas fa-play'} />
        </div>
      </td>
      <td className="copy-clipboard">
        <div
          className={`inline-button${hasCopiedToClipboard ? ' active' : ''}`}
          role="button"
          tabIndex={0}
          onKeyPress={e => {
            e.preventDefault()
            e.stopPropagation()
            navigator.clipboard.writeText(`!sound ${item.bot?.identifier}` || '')
            setHasCopied(true)
          }}
          onClick={e => {
            e.preventDefault()
            e.stopPropagation()
            navigator.clipboard.writeText(`!sound ${item.bot?.identifier}` || '')
            setHasCopied(true)
          }}
        >
          {hasCopiedToClipboard ? (
            <i className="fas fa-clipboard-check" />
          ) : (
            <i className="far fa-clipboard" />
          )}
        </div>
      </td>
      <td className="sound-name">
        <div className="name-split">
          <div className="name">{item.bot?.identifier}</div>
          <div className="description">
            {item.name} - {item.description}
          </div>
        </div>
      </td>
      <td className="cost center">{item.cost}</td>
      <td className="volume center">{Math.round((item.alert?.audio?.volume || 0) * 100)}%</td>
      <td className="duration center">
        {item.duration ? (
          `${Math.round(item.duration * 10) / 10}s`
        ) : (
          <i className="fas fa-question" />
        )}
      </td>
      <td className="waveform">
        <WaveSurfer onMount={handleWSMount} ref={wavesurferRef}>
          <WaveForm
            id={id}
            container={id}
            p
            cursorColor="#ff000000"
            waveColor="#BDBABD"
            progressColor="#9a64ff"
            height={35}
            barWidth={1}
            barHeight={3}
            cursorWidth={1}
            hideScrollbar={true}
          />
        </WaveSurfer>
      </td>
      <td className="check center enabled">
        <i className={item.enabled ? 'fas fa-check' : 'fas fa-times'} />
      </td>
      <td className="check center subs-only">
        <i className={item.subscriberOnly ? 'fas fa-check' : 'fas fa-times'} />
      </td>
      <td className="dateCreated center">
        {item.createdAt && format(new Date(item.createdAt), 'dd-MM-yyyy HH:mm:ss')}
      </td>
    </tr>
  )

  // async function playSound(soundFile: string, volume: number = 1.0) {
  //   const sound = new Audio(soundFile)
  //   sound.volume = volume
  //   setPlaying(true)
  //   try {
  //     await sound.play()
  //     const length = sound.duration
  //     setTimeout(() => setPlaying(false), length * 1000)
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }
}

export default React.memo(ItemRow)
