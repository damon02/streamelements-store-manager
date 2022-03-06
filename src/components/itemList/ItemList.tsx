import * as React from 'react'
import { useNavigate } from 'react-router-dom'

import ItemRow from './ItemRow'
import Title from '../title/Title'

import { EditedChannelItem, StreamElements, TableSortType } from '../../@types/types'
import { usePrevious } from '../../hooks/usePrevious'
import { useWindowSize } from '../../hooks/useWindowSize'
import { useDebounce } from '../../hooks/useDebounce'
import { useSessionStorage } from '../../hooks/useSessionStorage'

import './ItemList.scss'

interface IProps {
  allItems: EditedChannelItem[]
  items: EditedChannelItem[]
  user: StreamElements.Channel | undefined
  sort: { sort: TableSortType; order: 'asc' | 'desc' }
  setSort: (sort: { sort: TableSortType; order: 'asc' | 'desc' }) => void
  resetFilters: () => void
  guestUsername: string | null
}

const ItemList = ({
  allItems,
  items,
  user,
  sort,
  setSort,
  resetFilters,
  guestUsername
}: IProps) => {
  const navigate = useNavigate()
  const { height } = useWindowSize()
  const previousItemLength = usePrevious(items.length)
  const debouncedHeight = useDebounce(height, 100)

  const itemsPerPage = determineItemsPerPage(debouncedHeight || 980)
  const [page, setPage] = useSessionStorage<number>('page', 1)
  const lastPage = Math.ceil(items.length / itemsPerPage)

  React.useEffect(() => {
    if (previousItemLength !== items.length) {
      setPage(1)
    }
  }, [previousItemLength, items.length, setPage])

  return (
    <div className="list-wrapper">
      <Title titleItems={[`Page ${page}`, 'Sounds', user?.displayName]} />
      <table className="item-list">
        <thead>
          <tr className="table-header">
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <th className="play" />
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <th className="copy-clipboard" />
            <th className="sound-name clickable" onClick={() => handleSort('soundName')}>
              Sound name
              <i
                className={`fas fa-sort${
                  sort.sort === 'soundName' ? (sort.order === 'asc' ? '-up' : '-down') : ' unset'
                }`}
              />
            </th>
            <th className="cost center clickable" onClick={() => handleSort('cost')}>
              Cost
              <i
                className={`fas fa-sort${
                  sort.sort === 'cost' ? (sort.order === 'asc' ? '-up' : '-down') : ' unset'
                }`}
              />
            </th>
            <th className="volume center clickable" onClick={() => handleSort('volume')}>
              Volume
              <i
                className={`fas fa-sort${
                  sort.sort === 'volume' ? (sort.order === 'asc' ? '-up' : '-down') : ' unset'
                }`}
              />
            </th>
            <th className="duration center clickable" onClick={() => handleSort('duration')}>
              Duration
              <i
                className={`fas fa-sort${
                  sort.sort === 'duration' ? (sort.order === 'asc' ? '-up' : '-down') : ' unset'
                }`}
              />
            </th>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <th className="waveform" />
            <th className="check center enabled clickable" onClick={() => handleSort('enabled')}>
              Enabled
              <i
                className={`fas fa-sort${
                  sort.sort === 'enabled' ? (sort.order === 'asc' ? '-up' : '-down') : ' unset'
                }`}
              />
            </th>
            <th className="check center subs-only clickable" onClick={() => handleSort('subsOnly')}>
              Subs only{' '}
              <i
                className={`fas fa-sort${
                  sort.sort === 'subsOnly' ? (sort.order === 'asc' ? '-up' : '-down') : ' unset'
                }`}
              />
            </th>
            <th className="dateCreated center clickable" onClick={() => handleSort('dateCreated')}>
              Date created
              <i
                className={`fas fa-sort${
                  sort.sort === 'dateCreated' ? (sort.order === 'asc' ? '-up' : '-down') : ' unset'
                }`}
              />
            </th>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <th className="download" />
          </tr>
        </thead>
        <tbody>
          {items.slice((page - 1) * itemsPerPage, page * itemsPerPage).map(i => (
            <ItemRow item={i} key={i._id} guestUsername={guestUsername} />
          ))}
        </tbody>
      </table>
      <div className="page-controller-wrapper">
        {items.length !== allItems.length && (
          <div
            className="filtered-warning"
            onClick={() => resetFilters()}
            onKeyPress={() => resetFilters()}
            tabIndex={0}
            role="button"
          >
            Results are filtered, click here to clear filters
          </div>
        )}
        <div className="page-controller">
          <div className="buttons-pages">
            <button
              className="button first-page primary small"
              type="button"
              onClick={() => setPage(1)}
              disabled={page === 1}
            >
              <i className="icon fas fa-angle-double-left" />
            </button>
            <button
              className="button previous"
              type="button"
              onClick={() => handlePageClick('previous')}
              disabled={page === 1}
            >
              <i className="icon fas fa-angle-left" />
              <span className="text">Previous page</span>
            </button>
            <div className="page-summary">
              <div className="page-number">
                Page {page} of{' '}
                {items.length < itemsPerPage ? 1 : Math.ceil(items.length / itemsPerPage)}
              </div>
              <div className="amount-per-page">{items.length} results</div>
            </div>
            <button
              className="button next"
              type="button"
              onClick={() => handlePageClick('next')}
              disabled={page === lastPage}
            >
              <i className="icon fas fa-angle-right" />
              <span className="text">Next page</span>
            </button>
            <button
              className="button last-page primary small"
              type="button"
              onClick={() => setPage(lastPage)}
              disabled={page === lastPage}
            >
              <i className="icon fas fa-angle-double-right" />
            </button>
          </div>
          {!guestUsername && (
            <button
              className="button primary small with-icon-margin new"
              type="button"
              onClick={() => navigate(`item/new`)}
            >
              <i className="icon fas fa-plus" />
              <span className="text">Add new sound</span>
            </button>
          )}
        </div>
      </div>
    </div>
  )

  function determineItemsPerPage(h: number) {
    const itemAmount = (h - 174 - (items.length !== allItems.length ? 20 : 0)) / 40
    return Math.floor(itemAmount)
  }

  function handleSort(key: TableSortType) {
    setSort({
      sort: key,
      order: sort.sort === key ? (sort.order === 'asc' ? 'desc' : 'asc') : 'asc'
    })
  }

  function handlePageClick(method: 'previous' | 'next') {
    const newPage = method === 'previous' ? page - 1 : page + 1
    setPage(newPage)
  }
}

export default ItemList
