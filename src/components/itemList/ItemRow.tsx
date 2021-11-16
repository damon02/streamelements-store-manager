import * as React from 'react'
import { WaveSurfer, WaveForm } from 'wavesurfer-react'

import { StreamElements } from '../../@types/types'

interface IProps {
  item: StreamElements.ChannelItem
}

const ItemRow = ({ item }: IProps) => {
  const id = `waveform-${item._id}`
  const wavesurferRef = React.useRef<any>(null)

  const [playing, setPlaying] = React.useState(false)
  const [playPosition, setPlayPosition] = React.useState(0)
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
      }
    },
    [item.alert?.audio?.src]
  )

  const play = React.useCallback(() => {
    wavesurferRef.current.playPause()
  }, [])

  React.useEffect(() => {
    if (wavesurferRef.current) {
      wavesurferRef.current.setVolume(item.alert?.audio?.volume)
    }
  }, [wavesurferRef.current])

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
                play()
              }
            }
          }}
          onClick={e => {
            e.preventDefault()
            e.stopPropagation()
            if (item.alert?.audio?.src && !playing) {
              play()
            }
          }}
        >
          <i className={playing ? 'fas fa-pause' : 'fas fa-play'} />
        </div>
      </td>
      <td className="sound-name">{item.bot?.identifier}</td>
      <td className="cost center">{item.cost}</td>
      <td className="volume center">{Math.round((item.alert?.audio?.volume || 0) * 100)}%</td>
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

export default ItemRow
