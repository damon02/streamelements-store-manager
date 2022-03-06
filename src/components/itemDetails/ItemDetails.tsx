import { formatDuration, intervalToDuration } from 'date-fns'
import Slider from 'rc-slider'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import ItemWrapper from './ItemWrapper'
import FilePicker from './FilePicker'

import { useItems } from '../../hooks/useOutletContexts'
import { EditedChannelItem, StreamElements } from '../../@types/types'
import { useAuth } from '../../hooks/useAuth'
import { useOnClickOutside } from '../../hooks/useOnClickOutside'
import { useSessionStorage } from '../../hooks/useSessionStorage'

import './ItemDetails.scss'
import DeletePrompt from './DeletePrompt'

const ItemDetails = () => {
  const navigate = useNavigate()
  const { APIService, user, guestUsername } = useAuth()
  const { itemId } = useParams()
  const { items, files, setItem, reloadItems } = useItems()
  const [saving, setSaving] = useState(false)
  const [showDeletePrompt, setShowDeletePrompt] = useState(false)

  const item = items.find(i => i._id === itemId)

  const id = item?._id || 'new'
  const [enabled, setEnabled] = useSessionStorage<boolean | undefined>(
    `enabled-${id}`,
    item?.enabled === undefined ? true : item.enabled
  )
  const [name, setName] = useSessionStorage<string>(`name-${id}`, item?.name || '')
  const [description, setDescription] = useSessionStorage<string>(
    `description-${id}`,
    item?.description || ''
  )
  const [cost, setCost] = useSessionStorage<number>(`cost-${id}`, item?.cost || 10)
  const [quantity, setQuantity] = useSessionStorage<number>(
    `quantity-${id}`,
    item?.quantity.total || -1
  )
  const [globalCooldown, setGlobalCooldown] = useSessionStorage<number>(
    `globalCooldown-${id}`,
    item?.cooldown?.global || 0
  )
  const [userCooldown, setUserCooldown] = useSessionStorage<number>(
    `userCooldown-${id}`,
    item?.cooldown?.user || 10
  )
  const [categoryCooldownName, setCategoryCooldownName] = useSessionStorage<string>(
    `categoryCooldownName-${id}`,
    item?.categoryName || ''
  )
  const [categoryCooldownTime, setCategoryCooldownTime] = useSessionStorage<number>(
    `categoryCooldownTime-${id}`,
    item?.cooldown?.category || 0
  )
  const [volume, setVolume] = useSessionStorage<number>(
    `volume-${id}`,
    item?.alert?.audio?.volume || 1
  )
  const [command, setCommand] = useSessionStorage<string>(
    `command-${id}`,
    item?.bot?.identifier || ''
  )

  // File specific values
  const [selectedFile, setSelectedFile] = useState<
    StreamElements.UploadedFile | 'new' | undefined
  >()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [redeemables, setRedeemables] = useSessionStorage<{
    website: boolean
    extension: boolean
    bot: boolean
    confirmation: boolean
  }>(`redeemables-${id}`, {
    website: false,
    extension: false,
    bot: true,
    confirmation: true
  })

  const ref = React.useRef<HTMLDivElement>(null)
  useOnClickOutside(ref, showDeletePrompt ? () => ({}) : handleCloseDetails)

  useEffect(() => {
    if (guestUsername) {
      handleCloseDetails()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (item) {
      setEnabled(item.enabled)
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item])

  useEffect(() => {
    const match = files.find(u => u.url === item?.alert?.audio?.src)
    setSelectedFile(match)
  }, [files, item])

  const unsavedChanges = hasUnsavedChanges()

  return (
    <>
      <DeletePrompt
        api={APIService}
        channelId={user?._id}
        itemId={id}
        showPrompt={showDeletePrompt}
        setShowPrompt={setShowDeletePrompt}
        onDelete={() => handleCloseDetails()}
      />
      <div className="item-details-wrapper">
        <div className="floating-block" ref={ref}>
          <div className="content left">
            <ItemWrapper
              label="Item name"
              type="input large"
              subtitle="This will be presented to the chat"
              value={name}
              onChange={value => setName(value as string)}
            />
            <div
              className="item-wrapper checkbox"
              onClick={() => setEnabled(!enabled)}
              onKeyPress={() => setEnabled(!enabled)}
              tabIndex={0}
              role="button"
            >
              <input type="checkbox" checked={enabled} onClick={() => setEnabled(!enabled)} />
              <label>Enabled</label>
            </div>
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
            <FilePicker
              files={files}
              item={item}
              selectedFile={selectedFile}
              setSelectedFile={setSelectedFile}
              volume={volume}
              fileInputRef={fileInputRef}
            />

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
              onKeyPress={() =>
                setRedeemables({ ...redeemables, extension: !redeemables.extension })
              }
              tabIndex={0}
              role="button"
            >
              <input
                type="checkbox"
                checked={redeemables.extension}
                onClick={() =>
                  setRedeemables({ ...redeemables, extension: !redeemables.extension })
                }
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
              {item?.alert?.audio?.src && (
                <button
                  className="button secondary"
                  type="button"
                  disabled={saving}
                  onClick={() => handleCloseDetails()}
                >
                  Cancel changes
                </button>
              )}
              {id === 'new' ? (
                <button
                  className="button primary"
                  type="button"
                  disabled={selectedFile === undefined}
                  onClick={() => handleOnSave()}
                >
                  {saving ? <i className="fas fa-spin fa-spinner" /> : 'Upload new sound'}
                </button>
              ) : (
                <button
                  className="button primary"
                  type="button"
                  disabled={!unsavedChanges}
                  onClick={() => handleOnSave()}
                >
                  {saving ? <i className="fas fa-spin fa-spinner" /> : 'Change sound'}
                </button>
              )}
            </div>
            {id !== 'new' && (
              <div className="buttons">
                <button
                  className="button danger"
                  type="button"
                  onClick={() => setShowDeletePrompt(true)}
                >
                  Delete sound
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )

  function handleCloseDetails() {
    navigate('/')
  }

  function hasUnsavedChanges() {
    return (
      (selectedFile !== 'new' && selectedFile?.url !== item?.alert?.audio?.src) ||
      (enabled !== item?.enabled && item?.enabled !== undefined) ||
      name !== item?.name ||
      description !== item?.description ||
      cost !== item?.cost ||
      quantity !== item?.quantity.total ||
      globalCooldown !== item.cooldown?.global ||
      userCooldown !== item.cooldown.user ||
      categoryCooldownName !== item.categoryName ||
      categoryCooldownTime !== item.cooldown.category ||
      volume !== item.alert?.audio?.volume ||
      command !== item.bot?.identifier
    )
  }

  async function handleOnSave() {
    const file = fileInputRef?.current?.files?.[0]

    // If a file is selected, upload it to StreamElements
    if (user && APIService && file) {
      try {
        const uploadedFile = await APIService.uploadFile(user._id, file)
        addNewSound(uploadedFile)
      } catch (error) {
        console.error(error)
      }
    }

    // Then check if it is a new sound
    if (!item?.alert?.audio?.src && selectedFile && selectedFile !== 'new') {
      await addNewSound(selectedFile)
    } else {
      // Or changes have been made to an existing sound
      await applyChanges()
    }

    // Reload/refresh sounds
    if (id === 'new') {
      resetAllToDefaults()
    }

    reloadItems()
  }

  async function addNewSound(file: StreamElements.UploadedFile) {
    if (user && APIService && file) {
      try {
        setSaving(true)
        const newItem = convertInputsToEditedChannelItem(undefined, file)
        const uploadedItem = await APIService.createChannelItem(user._id, {
          ...newItem,
          accessCodes: {
            keys: [],
            mode: 'multi'
          },
          accessLevel: 100,
          allowMessages: false
        })
        setItem(uploadedItem)

        handleCloseDetails()
      } catch (error) {
        console.error(error)
      } finally {
        setSaving(false)
      }
    }
  }

  async function applyChanges() {
    if (user && APIService && item) {
      try {
        setSaving(true)
        const newItem: EditedChannelItem = convertInputsToEditedChannelItem(item)

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

  function convertInputsToEditedChannelItem(
    existingChannelItem?: EditedChannelItem,
    newFile?: StreamElements.UploadedFile
  ): EditedChannelItem {
    const newItem: EditedChannelItem = {
      ...existingChannelItem,
      name,
      description,
      cost,
      quantity: { total: quantity },
      cooldown: {
        ...existingChannelItem?.cooldown,
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
        ...existingChannelItem?.alert,
        enabled: true,
        graphics: { duration: 8, type: 'image' },
        audio: {
          id: newFile?._id,
          name: newFile?.name,
          src: newFile?.url ? newFile.url : selectedFile !== 'new' ? selectedFile?.url : undefined,
          type: 'sound',
          volume
        }
      },
      bot: {
        sendResponse: redeemables.confirmation || false,
        identifier: command
      },
      enabled,

      // New item only
      channel: user?._id,
      subscriberOnly: true,
      featured: existingChannelItem?.enabled || false,
      type: 'effect',
      userInput: [],
      accessLevel: 100
    }

    delete newItem.duration

    return newItem
  }

  function resetAllToDefaults() {
    setName('')
    setDescription('')
    setCost(10)
    setQuantity(-1)
    setGlobalCooldown(0)
    setUserCooldown(0)
    setCategoryCooldownName('')
    setCategoryCooldownTime(0)
    setVolume(1)
    setRedeemables({
      website: false,
      extension: false,
      bot: true,
      confirmation: true
    })
    setCommand('')
  }
}

export default ItemDetails
