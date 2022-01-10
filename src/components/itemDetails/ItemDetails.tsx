import { formatDuration, intervalToDuration } from 'date-fns'
import Slider from 'rc-slider'
import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { WaveSurfer, WaveForm } from 'wavesurfer-react'

import ItemWrapper from './ItemWrapper'

import { useItems } from '../../hooks/useOutletContexts'
import { EditedChannelItem, StreamElements } from '../../@types/types'
import { useAuth } from '../../hooks/useAuth'

import './ItemDetails.scss'

const ItemDetails = () => {
  const navigate = useNavigate()
  const { APIService, user } = useAuth()
  const { itemId } = useParams()
  const { items, files, setItem } = useItems()

  const [saving, setSaving] = useState(false)

  const wavesurferRef = React.useRef<any>(null)

  const item = items.find(i => i._id === itemId)

  const [name, setName] = useState<string>(item?.name || '')
  const [description, setDescription] = useState<string>(item?.description || '')
  const [cost, setCost] = useState<number>(item?.cost || 0)
  const [quantity, setQuantity] = useState<number>(item?.quantity.total || -1)
  const [globalCooldown, setGlobalCooldown] = useState<number>(item?.cooldown?.global || 0)
  const [userCooldown, setUserCooldown] = useState<number>(item?.cooldown?.user || 0)
  const [categoryCooldownName, setCategoryCooldownName] = useState<string>(item?.categoryName || '')
  const [categoryCooldownTime, setCategoryCooldownTime] = useState<number>(
    item?.cooldown?.category || 0
  )
  const [volume, setVolume] = useState<number>(item?.alert?.audio?.volume || 1)
  const [command, setCommand] = useState<string>(item?.bot?.identifier || '')

  // File specific values
  const [selectedFile, setSelectedFile] = useState<StreamElements.UploadedFile>()
  const [playing, setPlaying] = useState(false)
  const [duration, setDuration] = useState<number>()
  const [playPosition, setPlayPosition] = useState(0)

  const [redeemables, setRedeemables] = useState({
    website: false,
    extension: false,
    bot: true,
    confirmation: true
  })

  const handleWSMount = useCallback(
    waveSurfer => {
      wavesurferRef.current = waveSurfer

      if (wavesurferRef.current && selectedFile?.url) {
        wavesurferRef.current.load(selectedFile?.url)

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
    [selectedFile?.url]
  )

  useEffect(() => {
    if (item) {
      setName(item.name)
      setDescription(item.description)
      setCost(item.cost)
      setQuantity(item.quantity.total)
      setGlobalCooldown(item.cooldown?.global || 0)
      setUserCooldown(item.cooldown?.user || 0)
      setCategoryCooldownName(item?.categoryName || '')
      setCategoryCooldownTime(item?.cooldown?.category || 0)
      setVolume(item?.alert?.audio?.volume || 1)
      setRedeemables({
        website: item?.sources.includes('website') || false,
        extension: item?.sources.includes('extension') || false,
        bot: item?.sources.includes('bot') || true,
        confirmation: item?.bot?.sendResponse || true
      })
      setCommand(item.bot?.identifier || '')
    }
  }, [item])

  useEffect(() => {
    const match = files.find(u => u.url === item?.alert?.audio?.src)
    setSelectedFile(match)
  }, [files, item])

  const playSound = React.useCallback(() => {
    wavesurferRef.current.playPause()
  }, [])

  useEffect(() => {
    if (wavesurferRef.current) {
      wavesurferRef.current.setVolume(volume)
    }
  }, [volume])

  useEffect(() => {
    setTimeout(() => getDuration(), 1000)
  }, [])

  if (!item) {
    return null
  }

  return (
    <div className="item-details-wrapper">
      <div className="floating-block">
        <div className="content left">
          <ItemWrapper
            label="Item name"
            type="input large"
            subtitle="This will be presented to the chat"
            value={name}
            onChange={value => setName(value as string)}
          />
          <ItemWrapper
            label="Description"
            type="textarea"
            subtitle="Only visible in StreamElements."
            value={description}
            onChange={value => setDescription(value as string)}
          />

          <div className="flex">
            <ItemWrapper
              label="Item cost"
              type="input number"
              subtitle="Cost of this item in points"
              value={cost}
              onChange={value => setCost(value as number)}
            />

            <ItemWrapper
              label="Quantity"
              type="input number"
              subtitle="-1 for unlimited amount"
              value={quantity}
              allowsMin={-1}
              onChange={value => setQuantity(value as number)}
            />
          </div>
          <div className="flex">
            <ItemWrapper
              label="Global cooldown"
              type="input number"
              subtitle={`In seconds, (${
                globalCooldown
                  ? formatDuration(
                      intervalToDuration({
                        start: 0,
                        end: (globalCooldown || 0.01) * 1000
                      }),
                      { format: ['years', 'days', 'hours', 'minutes', 'seconds'] }
                    )
                  : '?'
              })`}
              value={globalCooldown}
              onChange={value => setGlobalCooldown(value as number)}
            />
            <ItemWrapper
              label="User cooldown"
              type="input number"
              subtitle={`In seconds, (${
                userCooldown
                  ? formatDuration(
                      intervalToDuration({
                        start: 0,
                        end: (userCooldown || 0) * 1000
                      }),
                      { format: ['years', 'days', 'hours', 'minutes', 'seconds'] }
                    )
                  : '?'
              })`}
              value={userCooldown}
              onChange={value => setUserCooldown(value as number)}
            />
          </div>

          <div className="flex item-wrapper">
            <label>Category cooldown</label>
            <label className="toptitle">
              A user is blocked from purchasing items from the same category during the cool down
              period.
            </label>
            <div className="flex">
              <ItemWrapper
                type="input"
                placeholder="Name"
                value={categoryCooldownName}
                onChange={value => setCategoryCooldownName(value as string)}
              />
              <ItemWrapper
                type="input number"
                placeholder="Time in seconds"
                value={categoryCooldownTime}
                onChange={value => setCategoryCooldownTime(value as number)}
                subtitle={`In seconds, (${
                  categoryCooldownTime
                    ? formatDuration(
                        intervalToDuration({
                          start: 0,
                          end: (categoryCooldownTime || 0) * 1000
                        }),
                        { format: ['years', 'days', 'hours', 'minutes', 'seconds'] }
                      )
                    : '?'
                })`}
              />
            </div>
          </div>
        </div>
        <div className="content right">
          <div className="item-wrapper file">
            <div className="file-tag">
              <button
                className="play-button"
                type="button"
                onClick={e => {
                  e.preventDefault()
                  e.stopPropagation()
                  if (item.alert?.audio?.src) {
                    playSound()
                  }
                }}
              >
                {playing ? <i className="fas fa-pause" /> : <i className="fas fa-play" />}
              </button>
              <div className="detail-rows">
                <div className="name">
                  <i className="icon fas fa-file-audio" />
                  <span className="subtitle">{selectedFile?.name}</span>
                </div>
                <div className="duration">
                  <i className="icon fas fa-music" />
                  {duration ? (
                    `${
                      playPosition !== 0 &&
                      Math.round(playPosition * 10) / 10 !== Math.round(duration * 10) / 10
                        ? `${Math.round(playPosition * 10) / 10}s / `
                        : ''
                    }${Math.round(duration * 10) / 10}s`
                  ) : (
                    <i className="fas fa-spin fa-spinner" />
                  )}
                </div>
              </div>

              {selectedFile && (
                <div className="waveform">
                  <WaveSurfer onMount={handleWSMount} ref={wavesurferRef}>
                    <WaveForm
                      id={`waveform-${selectedFile?._id}`}
                      container={`waveform-${selectedFile?._id}`}
                      p
                      cursorColor="#ff000000"
                      waveColor="#BDBABD"
                      progressColor="#FFFFFF"
                      height={35}
                      barWidth={1}
                      barHeight={3}
                      cursorWidth={1}
                      hideScrollbar={true}
                    />
                  </WaveSurfer>
                </div>
              )}
            </div>
          </div>

          <div className="item-wrapper volume">
            <label>Volume ({Math.round((volume || 0) * 100)}%)</label>
            <Slider
              value={volume}
              onChange={v => setVolume(v)}
              min={0}
              max={1}
              step={0.01}
              handleStyle={{
                height: 24,
                width: 24,
                marginTop: -7,
                backgroundColor: '#6441a5',
                borderColor: '#9a64ff'
              }}
              railStyle={{ backgroundColor: '#282a36', height: 10 }}
              trackStyle={{ backgroundColor: '#9a64ff', height: 10 }}
            />
          </div>

          <div
            className="item-wrapper checkbox"
            onClick={() => setRedeemables({ ...redeemables, website: !redeemables.website })}
            onKeyPress={() => setRedeemables({ ...redeemables, website: !redeemables.website })}
            tabIndex={0}
            role="button"
          >
            <input
              type="checkbox"
              checked={redeemables.website}
              onClick={() => setRedeemables({ ...redeemables, website: !redeemables.website })}
            />
            <label>Redeemable via website</label>
          </div>
          <div
            className="item-wrapper checkbox"
            onClick={() => setRedeemables({ ...redeemables, extension: !redeemables.extension })}
            onKeyPress={() => setRedeemables({ ...redeemables, extension: !redeemables.extension })}
            tabIndex={0}
            role="button"
          >
            <input
              type="checkbox"
              checked={redeemables.extension}
              onClick={() => setRedeemables({ ...redeemables, extension: !redeemables.extension })}
            />
            <label>Redeemable via extension</label>
          </div>
          <div
            className="item-wrapper checkbox"
            onClick={() => setRedeemables({ ...redeemables, bot: !redeemables.bot })}
            onKeyPress={() => setRedeemables({ ...redeemables, bot: !redeemables.bot })}
            tabIndex={0}
            role="button"
          >
            <input
              type="checkbox"
              checked={redeemables.bot}
              onClick={() => setRedeemables({ ...redeemables, bot: !redeemables.bot })}
            />
            <label>Redeemable via chat</label>
          </div>
          <div
            className="item-wrapper checkbox"
            onClick={() =>
              setRedeemables({ ...redeemables, confirmation: !redeemables.confirmation })
            }
            onKeyPress={() =>
              setRedeemables({ ...redeemables, confirmation: !redeemables.confirmation })
            }
            tabIndex={0}
            role="button"
          >
            <input
              type="checkbox"
              checked={redeemables.confirmation}
              onClick={() =>
                setRedeemables({ ...redeemables, confirmation: !redeemables.confirmation })
              }
            />
            <label>Send confirmation when redeeming via chat</label>
          </div>

          <ItemWrapper
            type="input"
            value={command}
            onChange={v => setCommand(v as string)}
            label="Item chat command"
            subtitle={`To play, type "!sound ${command}" in the chat`}
          />
          <div className="buttons">
            <button className="button primary green" type="button" onClick={applyChanges}>
              {saving ? <i className="fas fa-spin fa-spinner" /> : 'Save changes'}
            </button>
            <button
              className="button secondary"
              type="button"
              disabled={saving}
              onClick={() => handleCloseDetails()}
            >
              Cancel changes
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  function handleCloseDetails() {
    navigate('/')
  }

  function getDuration() {
    const dur = wavesurferRef.current.getDuration()
    setDuration(dur)
  }

  async function applyChanges() {
    if (user && APIService && item) {
      try {
        setSaving(true)
        const newItem: EditedChannelItem = {
          ...item,
          name,
          description,
          cost,
          quantity: { total: quantity },
          cooldown: {
            ...item.cooldown,
            category: categoryCooldownTime,
            global: globalCooldown,
            user: userCooldown
          },
          categoryName: categoryCooldownName,
          sources: [
            redeemables.bot ? 'bot' : undefined,
            redeemables.extension ? 'extension' : undefined,
            redeemables.website ? 'website' : undefined
          ].filter(v => v) as string[],
          alert: {
            ...item.alert,
            audio: {
              src: selectedFile?.url,
              volume
            }
          },
          bot: {
            sendResponse: redeemables.confirmation || false,
            identifier: command
          }
        }

        delete newItem.duration

        const processedItem = await APIService?.saveChannelItem(user._id, newItem)
        setItem(processedItem)
        handleCloseDetails()
      } catch (error) {
        console.error(error)
      } finally {
        setSaving(false)
      }
    }
  }
}

export default ItemDetails
