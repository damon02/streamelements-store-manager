import * as React from 'react'
import { StreamElements, TableSortType } from '../../@types/types'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { sortByKey } from '../../utils/general'
import FilterHeader from './FilterHeader'

interface IProps {
  items: StreamElements.ChannelItem[]
  children: (
    FiltersComponent: React.ReactNode,
    processedItems: StreamElements.ChannelItem[],
    sort: { sort: TableSortType; order: 'asc' | 'desc' },
    setSort: (newSort: { sort: TableSortType; order: 'asc' | 'desc' }) => void
  ) => React.ReactNode
}

const FilterManager = ({ items, children }: IProps) => {
  const [query, setQuery] = useLocalStorage<string>('query', '')
  const [minVolume, setMinVolume] = useLocalStorage<number | undefined>('minVolume', undefined)
  const [maxVolume, setMaxVolume] = useLocalStorage<number | undefined>('maxVolume', undefined)
  const [minCost, setMinCost] = useLocalStorage<number | undefined>('minCost', undefined)
  const [maxCost, setMaxCost] = useLocalStorage<number | undefined>('maxCost', undefined)
  const [sort, setSort] = useLocalStorage<{ sort: TableSortType; order: 'asc' | 'desc' }>('sort', {
    sort: 'dateCreated',
    order: 'asc'
  })

  const [processedItems, setProcessedItems] = React.useState<StreamElements.ChannelItem[]>(items)
  const memoizedProcessFiltering = React.useCallback(processFiltering, [
    query,
    minVolume,
    maxVolume,
    minCost,
    maxCost
  ])

  React.useEffect(() => {
    setProcessedItems(memoizedProcessFiltering(items, sort))
  }, [items, memoizedProcessFiltering, sort])

  const FiltersComponent = FilterHeader({
    query,
    setQuery,
    minVolume,
    setMinVolume,
    maxVolume,
    setMaxVolume,
    minCost,
    setMinCost,
    maxCost,
    setMaxCost
  })

  return <>{children(FiltersComponent, processedItems, sort, setSort)}</>

  function processFiltering(
    allItems: StreamElements.ChannelItem[],
    s: { sort: TableSortType; order: 'asc' | 'desc' }
  ) {
    return sortByKey(
      allItems.filter(
        item =>
          item.name.toUpperCase().includes(query.toUpperCase()) &&
          (item.alert?.audio?.volume || 0) * 100 >= (minVolume || 0) &&
          (item.alert?.audio?.volume || 0) * 100 <= (maxVolume || 100) &&
          (item.cost || 0) >= (minCost || 0) &&
          (item.cost || 0) <= (maxCost || 100000000)
      ),
      mapSingleKeyToPath(s.sort),
      s.order
    )
  }

  function mapSingleKeyToPath(sortKey: TableSortType): string {
    switch (sortKey) {
      case 'soundName':
        return 'bot.identifier'
      case 'volume':
        return 'alert.audio.volume'
      case 'dateCreated':
        return 'createdAt'
      default:
        return sortKey
    }
  }
}

export default FilterManager
