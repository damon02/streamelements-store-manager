import React, { useCallback, useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'

import Header from '../../components/header/Header'
import ItemList from '../../components/itemList/ItemList'
import FilterManager from '../../components/filterManager/FilterManager'

import { EditedChannelItem, StreamElements } from '../../@types/types'
import { useAuth } from '../../hooks/useAuth'

import './Home.scss'

const Home = () => {
  const { user, setUser, APIService, setToken } = useAuth()
  const [items, setItems] = useState<EditedChannelItem[]>([])
  const [files, setFiles] = useState<StreamElements.UploadedFile[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const memoizedFetchUserDetails = useCallback(fetchUserDetails, [APIService, setUser])
  const memoizedFetchChannelItems = useCallback(fetchUserStoreItems, [APIService])
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
        <Header user={user} loading={loading} logout={() => setToken(null)} />
        <div className="content">
          <FilterManager items={items} setItems={setItems}>
            {(FiltersComponent, processedItems, sort, setSort) => (
              <>
                {FiltersComponent}
                <ItemList
                  items={processedItems}
                  setItems={setItems}
                  allItems={items}
                  sort={sort}
                  setSort={setSort}
                />
              </>
            )}
          </FilterManager>
        </div>
      </div>

      {/** Used for rendering above page */}
      <Outlet context={{ items, files, setItem: handleSetItem, setFile: handleSetFile }} />
    </>
  )

  async function fetchUserDetails() {
    if (APIService) {
      try {
        setLoading(true)
        const channel = await APIService?.getMeDetails()
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

        if (0 === 0) {
          setItems(channelItems.slice(0, 25))
        }
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
  }

  function handleSetItem(item: StreamElements.ChannelItem) {
    const index = items.findIndex(x => x._id === item._id)

    console.log(index)

    if (index) {
      const newArr = [...items]
      newArr[index] = item
      console.log(newArr)
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
}

export default Home
