import * as React from 'react'
import { cloneDeep } from 'lodash'

import ItemRow from './ItemRow'

import { EditedChannelItem, TableSortType } from '../../@types/types'
import './ItemList.scss'

interface IProps {
  allItems: EditedChannelItem[]
  items: EditedChannelItem[]
  setItems: (items: EditedChannelItem[]) => void
  sort: { sort: TableSortType; order: 'asc' | 'desc' }
  setSort: (sort: { sort: TableSortType; order: 'asc' | 'desc' }) => void
}

const ItemList = ({ allItems, items, setItems, sort, setSort }: IProps) => {
  return (
    <table className="item-list">
      <thead>
        <tr className="table-header">
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <th className="checkbox" />
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <th className="play" />
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
          <th className="duration center">Duration</th>
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
          <th className="age center clickable" onClick={() => handleSort('dateCreated')}>
            Date created
            <i
              className={`fas fa-sort${
                sort.sort === 'dateCreated' ? (sort.order === 'asc' ? '-up' : '-down') : ' unset'
              }`}
            />
          </th>
        </tr>
      </thead>
      <tbody>
        {items.map(i => (
          <ItemRow item={i} key={i._id} setItem={handleSetItem} />
        ))}
      </tbody>
    </table>
  )

  function handleSort(key: TableSortType) {
    setSort({
      sort: key,
      order: sort.sort === key ? (sort.order === 'asc' ? 'desc' : 'asc') : 'asc'
    })
  }

  function handleSetItem(item: EditedChannelItem) {
    const index = allItems.findIndex(x => x._id === item._id)

    if (index) {
      const newx = cloneDeep(allItems)
      newx[index] = item

      setItems(newx)
    }
  }
}

export default ItemList
