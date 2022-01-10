import { useOutletContext } from 'react-router'
import { EditedChannelItem, StreamElements } from '../@types/types'

export function useItems() {
  return useOutletContext<{
    items: EditedChannelItem[]
    setItem: (item: StreamElements.ChannelItem) => void
    files: StreamElements.UploadedFile[]
    setFile: (file: StreamElements.UploadedFile) => void
  }>()
}
