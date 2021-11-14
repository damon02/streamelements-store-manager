/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable camelcase */

export type TableSortType =
  | 'dateCreated'
  | 'dateUpdated'
  | 'soundName'
  | 'name'
  | 'volume'
  | 'cost'
  | 'enabled'
  | 'subsOnly'

namespace StreamElements {
  type OAuth2Scopes =
    | 'tips:read'
    | 'tips:write'
    | 'activities:read'
    | 'activities:write'
    | 'loyalty:read'
    | 'loyalty:write'
    | 'overlays:read'
    | 'overlays:write'
    | 'store:read'
    | 'store:write'
    | 'bot:read'
    | 'bot:write'
    | 'session:read'
    | 'contest:read'
    | 'contest:write'
    | 'giveaway:read'
    | 'giveaway:write'

  type UserType = 'owner' | 'botModerator' | 'editor'

  interface AccessToken {
    access_token: string
    token_type: 'Bearer'
    expires_in: number
    refresh_token: string
    scope: ''
  }

  interface Channel {
    ab?: {
      cup_emotes?: string
      manager?: string
      merchtorsodidntsemerch?: string
      obslive_stable_release_group?: string
      'use-third-party-activities'?: string
    }
    accessToken?: string
    alias: string
    apiToken?: string
    avatar: string
    broadcasterType?: string // "partner"
    channels?: Channel[]
    country?: string
    createdAt?: string
    displayName: string
    email?: string
    features?: object
    geo?: string
    inactive?: boolean
    isPartner?: boolean
    lastJWTToken?: string | null
    lastLogin?: string
    nullChannel?: boolean
    profile?: {
      headerImage: string
      title?: string
      language?: string
      social?: {
        discord?: string
        facebook?: string
        instagram?: string
        twitter?: string
        website?: string
        youtube?: string
      }
    }
    provider: 'twitch'
    providerEmails?: string[]
    providerId?: string
    providerTotals?: {
      'follower-total': 6
    }
    role?: UserType
    suspended?: boolean
    type?: 'streamer'
    updatedAt?: string
    username: string
    users?: {
      user: string
      providerId?: string
      role: UserType
      _id?: string
    }[]
    verified?: boolean
    _id: string
  }

  interface ChannelItem {
    alert?: {
      graphics?: {
        duration?: number
        type?: string
      }
      audio?: {
        volume?: number // FLOAT
        src?: string | null
      }
      enabled?: boolean
    }
    allowMessages?: boolean
    bot?: {
      enabled?: boolean
      identifier?: string
      sendResponse?: boolean
    }
    channel?: string
    cooldown?: {
      category?: number
      global?: number
      user?: number
    }
    cost: number
    createdAt: string
    description: string
    enabled: boolean
    featured: boolean
    name: string
    order: number
    public: boolean
    quantity: {
      total: number
    }
    sources: string[]
    subscriberOnly: boolean
    type: string // "perk", "effect"
    updatedAt: string
    userInput: string[]
    _id: string
  }
}
