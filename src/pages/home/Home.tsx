import React, { useCallback, useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { AudioContext } from 'standardized-audio-context'

import Header from '../../components/header/Header'
import ItemList from '../../components/itemList/ItemList'
import FilterManager from '../../components/filterManager/FilterManager'

import { EditedChannelItem, StreamElements } from '../../@types/types'
import { useAuth } from '../../hooks/useAuth'
import { loadFromLocalStorage, saveToLocalStorage } from '../../utils/localStorage'

import './Home.scss'

const Home = () => {
  const { user, setUser, APIService, token, setToken, guestUsername, setGuestUsername } = useAuth()
  const [items, setItems] = useState<EditedChannelItem[]>([])
  const [files, setFiles] = useState<StreamElements.UploadedFile[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const memoizedFetchUserDetails = useCallback(fetchUserDetails, [
    APIService,
    setUser,
    token,
    guestUsername
  ])
  const memoizedFetchChannelItems = useCallback(fetchUserStoreItems, [APIService, guestUsername])
  const memoizedFetchAllFileDetails = useCallback(fetchAllFileDetails, [APIService])

  useEffect(() => {
    memoizedFetchUserDetails()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (user?._id) {
      memoizedFetchChannelItems(user._id)
      memoizedFetchAllFileDetails(user._id)
    } else {
      setItems([])
    }
  }, [user?._id, memoizedFetchChannelItems, memoizedFetchAllFileDetails])

  return (
    <>
      <div className="home">
        <Header
          allItems={items}
          user={user}
          loading={loading}
          guestUsername={guestUsername}
          logout={() => {
            setToken(null)
            setGuestUsername(null)
          }}
        />
        <div className="content">
          <FilterManager items={items}>
            {(FiltersComponent, processedItems, sort, setSort, resetFilters) => (
              <>
                {FiltersComponent}
                <ItemList
                  user={user}
                  items={processedItems}
                  allItems={items}
                  sort={sort}
                  setSort={setSort}
                  resetFilters={resetFilters}
                  guestUsername={guestUsername}
                />
              </>
            )}
          </FilterManager>
        </div>
      </div>

      {/** Used for rendering above page */}
      <Outlet
        context={{ items, files, setItem: handleSetItem, setFile: handleSetFile, reloadItems }}
      />
    </>
  )

  function reloadItems() {
    if (user?._id) {
      memoizedFetchChannelItems(user._id)
      memoizedFetchAllFileDetails(user._id)
    }
  }

  async function fetchUserDetails() {
    if (APIService) {
      try {
        setLoading(true)
        const channel = token
          ? await APIService?.getMeDetails()
          : await APIService.getUserChannelFromUserName(guestUsername || '')

        setUser(channel)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
  }

  async function fetchUserStoreItems(channelId: string) {
    if (APIService) {
      try {
        setLoading(true)
        const channelItems = await APIService?.getChannelItems(channelId)
        const filteredItems = channelItems.filter(i =>
          guestUsername ? i.enabled && i.alert?.audio?.src : i
        ) as EditedChannelItem[]

        // Fetch previously saved file durations
        const key = `DURATIONS-${channelId}`
        const previouslyCachedDurations: Array<{ url: string; duration: number }> =
          loadFromLocalStorage(key, [])

        const itemsWithDuration = await Promise.all(
          filteredItems.map(async item => {
            const cachedDuration = previouslyCachedDurations.find(
              i => i.url === item.alert?.audio?.src
            )?.duration

            if (cachedDuration) {
              return {
                ...item,
                duration: cachedDuration
              }
            }
            const duration = await determineSoundDuration(item.alert?.audio?.src || '')
            return {
              ...item,
              duration: duration || undefined
            }
          })
        )

        // Save determined new durations of URL links
        saveToLocalStorage(
          key,
          itemsWithDuration
            .map(i =>
              i.alert?.audio?.src ? { url: i.alert?.audio?.src, duration: i.duration } : undefined
            )
            .filter(x => x)
        )

        setItems(itemsWithDuration)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
  }

  function handleSetItem(item: StreamElements.ChannelItem) {
    const index = items.findIndex(x => x._id === item._id)

    if (index) {
      const newArr = [...items]
      newArr[index] = item
      setItems(newArr)
    } else {
      setItems([...items, item])
    }
  }

  async function fetchAllFileDetails(channelId: string) {
    if (APIService && channelId) {
      try {
        setLoading(true)
        const allUploadedItems = await APIService?.getUploadedItems(channelId, undefined)
        setFiles(allUploadedItems.uploads)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
  }

  function handleSetFile(file: StreamElements.UploadedFile) {
    const index = files.findIndex(x => x._id === file._id)

    if (index) {
      const newArr = [...files]
      newArr[index] = file
      setFiles(newArr)
    } else {
      setFiles([...files, file])
    }
  }

  async function determineSoundDuration(url: string) {
    if (url) {
      try {
        const ctx = new AudioContext()

        const response = await fetch(url, {
          method: 'GET'
        }).then(r => r.arrayBuffer())

        const audioBuffer = await ctx.decodeAudioData(response, a => a)

        return audioBuffer.duration
      } catch (error) {
        console.error(error)
        return undefined
      }
    }

    return undefined
  }
}

export default Home
