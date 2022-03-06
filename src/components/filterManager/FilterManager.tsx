import * as React from 'react'
import { EditedChannelItem, TableSortType } from '../../@types/types'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { sortByKey } from '../../utils/general'
import FilterHeader from './FilterHeader'

interface IProps {
  items: EditedChannelItem[]
  children: (
    FiltersComponent: React.ReactNode,
    processedItems: EditedChannelItem[],
    sort: { sort: TableSortType; order: 'asc' | 'desc' },
    setSort: (newSort: { sort: TableSortType; order: 'asc' | 'desc' }) => void,
    resetFilters: () => void
  ) => React.ReactNode
}

const FilterManager = ({ items, children }: IProps) => {
  const [query, setQuery] = useLocalStorage<string>('query', '')
  const [minVolume, setMinVolume] = useLocalStorage<number | undefined>('minVolume', undefined)
  const [maxVolume, setMaxVolume] = useLocalStorage<number | undefined>('maxVolume', undefined)
  const [minCost, setMinCost] = useLocalStorage<number | undefined>('minCost', undefined)
  const [maxCost, setMaxCost] = useLocalStorage<number | undefined>('maxCost', undefined)
  const [minSeconds, setMinSeconds] = useLocalStorage<number | undefined>('minSeconds', undefined)
  const [maxSeconds, setMaxSeconds] = useLocalStorage<number | undefined>('maxSeconds', undefined)
  const [sort, setSort] = useLocalStorage<{ sort: TableSortType; order: 'asc' | 'desc' }>('sort', {
    sort: 'dateCreated',
    order: 'desc'
  })

  const [processedItems, setProcessedItems] = React.useState<EditedChannelItem[]>(items)
  const memoizedProcessFiltering = React.useCallback(processFiltering, [
    query,
    minVolume,
    maxVolume,
    minCost,
    maxCost,
    minSeconds,
    maxSeconds
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
    setMaxCost,
    minSeconds,
    setMinSeconds,
    maxSeconds,
    setMaxSeconds
  })

  return <>{children(FiltersComponent, processedItems, sort, setSort, resetFilters)}</>

  function processFiltering(
    allItems: EditedChannelItem[],
    s: { sort: TableSortType; order: 'asc' | 'desc' }
  ) {
    return sortByKey(
      allItems.filter(
        item =>
          // Query checking, any should match so OR
          (item.name.toUpperCase().indexOf(query.toUpperCase()) !== -1 ||
            item.description.toUpperCase().includes(query.toUpperCase()) ||
            item.bot?.identifier?.toUpperCase().includes(query.toUpperCase())) &&
          // Strict clauses so AND
          (item.alert?.audio?.volume || 0) * 100 >= (minVolume || 0) &&
          (item.alert?.audio?.volume || 0) * 100 <= (maxVolume || 100) &&
          (item.cost || 0) >= (minCost || 0) &&
          (item.cost || 0) <= (maxCost || 100000000) &&
          (item.duration || 0) >= (minSeconds || 0) &&
          (item.duration || 0) <= (maxSeconds || 100000000)
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
      case 'duration':
        return 'duration'

      default: {
        return sortKey
      }
    }
  }

  function resetFilters() {
    setQuery('')
    setMinVolume(undefined)
    setMaxVolume(undefined)
    setMinCost(undefined)
    setMaxCost(undefined)
    setMinSeconds(undefined)
    setMaxSeconds(undefined)
  }
}

export default FilterManager
