import React, { useCallback, useEffect, useState } from 'react'

import Header from '../../components/header/Header'
import ItemList from '../../components/itemList/ItemList'
import FilterManager from '../../components/filterManager/FilterManager'

import { EditedChannelItem } from '../../@types/types'
import { useAuth } from '../../hooks/useAuth'

import './Home.scss'

const Home = () => {
  const { user, setUser, APIService, setToken } = useAuth()
  const [items, setItems] = useState<EditedChannelItem[]>([])

  const memoizedFetchUserDetails = useCallback(fetchUserDetails, [APIService, setUser])
  const memoizedFetchChannelItems = useCallback(fetchUserStoreItems, [APIService])

  useEffect(() => {
    memoizedFetchUserDetails()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (user?._id) {
      memoizedFetchChannelItems(user?._id)
    } else {
      setItems([])
    }
  }, [user?._id, memoizedFetchChannelItems])

  return (
    <div className="home">
      <Header user={user} logout={() => setToken(null)} />
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
  )

  async function fetchUserDetails() {
    if (APIService) {
      try {
        const channel = await APIService?.getMeDetails()
        setUser(channel)
      } catch (error) {
        console.error(error)
      }
    }
  }

  async function fetchUserStoreItems(channelId: string) {
    if (APIService) {
      try {
        const channelItems = await APIService?.getChannelItems(channelId)
        setItems(channelItems)
      } catch (error) {
        console.error(error)
      }
    }
  }
}

export default Home
