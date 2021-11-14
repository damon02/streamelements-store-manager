import { BASE_URL } from '../utils/constants'
import { objectToQueryString } from '../utils/general'

export interface APIServiceProps {
  getMeDetails: () => Promise<StreamElements.Channel>
  getCurrentUserChannel: () => Promise<StreamElements.Channel>
  getChannelItems: (channelId: string) => Promise<StreamElements.ChannelItem[]>
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
