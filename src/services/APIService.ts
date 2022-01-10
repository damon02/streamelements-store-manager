import { BASE_URL } from '../utils/constants'
import { objectToQueryString } from '../utils/general'
import { StreamElements } from '../@types/types'

export interface APIServiceProps {
  getMeDetails: () => Promise<StreamElements.Channel>
  getCurrentUserChannel: () => Promise<StreamElements.Channel>
  getChannelItems: (channelId: string) => Promise<StreamElements.ChannelItem[]>
  saveChannelItem: (
    channelId: string,
    item: StreamElements.ChannelItem
  ) => Promise<StreamElements.ChannelItem>
  getUploadedItems: (
    channelId: string,
    limit?: number,
    offset?: number
  ) => Promise<StreamElements.UploadResponse>
}

const APIService = (token: string): APIServiceProps => ({
  getCurrentUserChannel: (): Promise<StreamElements.Channel> => {
    const options: RequestInit = {
      method: 'GET',
      headers: {
        Authorization: token
      }
    }

    return fetchAPI(`${BASE_URL}/v2/users/current`, options)
  },
  getMeDetails: (): Promise<StreamElements.Channel> => {
    const options: RequestInit = {
      method: 'GET',
      headers: {
        Authorization: token
      }
    }

    return fetchAPI(`${BASE_URL}/v2/channels/me`, options)
  },
  getChannelItems: (
    channelId: string,
    limit: number = 25,
    offset?: number
  ): Promise<StreamElements.ChannelItem[]> => {
    const options: RequestInit = {
      method: 'GET',
      headers: {
        Authorization: token
      }
    }

    const query = objectToQueryString({ limit, offset })

    return fetchAPI(`${BASE_URL}/v2/store/${channelId}/items${query}`, options)
  },
  saveChannelItem: (
    channelId: string,
    item: StreamElements.ChannelItem
  ): Promise<StreamElements.ChannelItem> => {
    const options: RequestInit = {
      method: 'PUT',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item)
    }

    return fetchAPI(`${BASE_URL}/v2/store/${channelId}/items/${item._id}`, options)
  },
  getUploadedItems: (
    channelId: string,
    limit?: number,
    offset?: number
  ): Promise<StreamElements.UploadResponse> => {
    const options: RequestInit = {
      method: 'GET',
      headers: {
        Authorization: token
      }
    }

    const query = objectToQueryString({ limit, offset, type: 'audio' })

    return fetchAPI(`${BASE_URL}/v2/uploads/${channelId}${query}`, options)
  }
})

function fetchAPI<T>(url: string, options: RequestInit): Promise<T> {
  return fetch(url, options).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText)
    }
    return response.json()
  })
}

export default APIService
