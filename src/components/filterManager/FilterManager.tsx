import * as React from 'react'
import { StreamElements, TableSortType } from '../../@types/types'

interface IProps {
  items: StreamElements.ChannelItem[]

  children: (
    processedItems: StreamElements.ChannelItem[],
    sort: TableSortType,
    setSort: (newSort: TableSortType) => void
  ) => React.ReactNode
}

const FilterManager = ({ items, children }: IProps) => {
  const [query, setQuery] = React.useState('')
  const [minVolume, setMinVolume] = React.useState(0)
  const [minCost, setMinCost] = React.useState(0)
  const [sort, setSort] = React.useState<TableSortType>('dateCreated')

  const [processedItems, setProcessedItems] = React.useState<StreamElements.ChannelItem[]>(items)

  return <>{children(processedItems, sort, setSort)}</>
}

export default FilterManager
