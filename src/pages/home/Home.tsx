import React, { useCallback, useEffect } from 'react'
import { APIServiceProps } from '../../services/APIService'

interface IProps {
  APIService: APIServiceProps | null
}

const Home = (props: IProps) => {
  const { APIService } = props
  const memoizedFetchUserDetails = useCallback(fetchUserDetails, [APIService])

  useEffect(() => {
    memoizedFetchUserDetails()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="home">
      Home
      <i />
    </div>
  )

  async function fetchUserDetails() {
    if (APIService) {
      try {
        const users = await APIService.getCurrentUserChannel()
        const onscreenID = users.channels?.find(u => u.username === 'onscreen')?._id

        if (onscreenID) {
          const items = await APIService?.getChannelItems(onscreenID)
          console.log(items)
        } else {
          console.error('no onscreen id :(')
        }
      } catch (error) {
        console.error(error)
      }
    }
  }
}

export default Home
