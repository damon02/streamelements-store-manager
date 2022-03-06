import { BASE_URL } from '../utils/constants'
import { objectToQueryString } from '../utils/general'
import { EditedChannelItem, StreamElements } from '../@types/types'

export interface APIServiceProps {
  getMeDetails: () => Promise<StreamElements.Channel>
  getCurrentUserChannel: () => Promise<StreamElements.Channel>
  getUserChannelFromUserName: (username: string) => Promise<StreamElements.Channel>
  getChannelItems: (channelId: string) => Promise<StreamElements.ChannelItem[]>
  saveChannelItem: (
    channelId: string,
    item: EditedChannelItem
  ) => Promise<StreamElements.ChannelItem>
  createChannelItem: (
    channelId: string,
    item: EditedChannelItem
  ) => Promise<StreamElements.ChannelItem>
  deleteChannelItem: (channelId: string, itemId: string) => Promise<void>
  getUploadedItems: (
    channelId: string,
    limit?: number,
    offset?: number
  ) => Promise<StreamElements.UploadResponse>
  uploadFile: (
    channelId: string,
    file: Blob,
    fileName?: string
  ) => Promise<StreamElements.UploadedFile>
}

const APIService = (token: string | undefined): APIServiceProps => ({
  getCurrentUserChannel: (): Promise<StreamElements.Channel> => {
    const options: RequestInit = {
      method: 'GET',
      headers: !token
        ? undefined
        : {
            Authorization: token
          }
    }

    return fetchAPI(`${BASE_URL}/v2/users/current`, options)
  },
  getUserChannelFromUserName: (username: string): Promise<StreamElements.Channel> => {
    const options: RequestInit = {
      method: 'GET'
    }

    return fetchAPI(`${BASE_URL}/v2/channels/${username}`, options)
  },
  getMeDetails: (): Promise<StreamElements.Channel> => {
    const options: RequestInit = {
      method: 'GET',
      headers: !token
        ? undefined
        : {
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
      headers: !token
        ? undefined
        : {
            Authorization: token
          }
    }

    const query = objectToQueryString({ limit, offset })

    return fetchAPI(`${BASE_URL}/v2/store/${channelId}/items${query}`, options)
  },
  saveChannelItem: (
    channelId: string,
    item: EditedChannelItem
  ): Promise<StreamElements.ChannelItem> => {
    if (!token) {
      throw new Error('API call only allowed when not a guest')
    }

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
  createChannelItem: (
    channelId: string,
    item: EditedChannelItem
  ): Promise<StreamElements.ChannelItem> => {
    if (!token) {
      throw new Error('API call only allowed when not a guest')
    }

    const options: RequestInit = {
      method: 'POST',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item)
    }

    return fetchAPI(`${BASE_URL}/v2/store/${channelId}/items`, options)
  },
  deleteChannelItem: (channelId: string, itemId: string): Promise<void> => {
    if (!token) {
      throw new Error('API call only allowed when not a guest')
    }

    const options: RequestInit = {
      method: 'DELETE',
      headers: {
        Authorization: token
      }
    }

    return fetch(`${BASE_URL}/v2/store/${channelId}/items/${itemId}`, options).then(() => {})
  },
  getUploadedItems: (
    channelId: string,
    limit?: number,
    offset?: number
  ): Promise<StreamElements.UploadResponse> => {
    if (!token) {
      throw new Error('API call only allowed when not a guest')
    }

    const options: RequestInit = {
      method: 'GET',
      headers: {
        Authorization: token
      }
    }

    const query = objectToQueryString({ limit, offset, type: 'audio' })

    return fetchAPI(`${BASE_URL}/v2/uploads/${channelId}${query}`, options)
  },
  uploadFile: (
    channelId: string,
    file: Blob,
    fileName?: string
  ): Promise<StreamElements.UploadedFile> => {
    if (!token) {
      throw new Error('API call only allowed when not a guest')
    }

    const formData = new FormData()
    formData.append('file', file, fileName)

    const options: RequestInit = {
      method: 'POST',
      headers: {
        Authorization: token
      },
      body: formData
    }

    return fetchAPI(`${BASE_URL}/v2/uploads/${channelId}`, options)
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
