import * as React from 'react'

import ItemRow from './ItemRow'

import { StreamElements } from '../../@types/types'
import './ItemList.scss'

interface IProps {
  items: StreamElements.ChannelItem[]
}

const ItemList = ({ items }: IProps) => {
  return (
    <table className="item-list">
      <thead>
        <tr className="table-header">
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <th className="checkbox" />
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <th className="play" />
          <th className="sound-name">Sound name</th>
          <th className="cost center">Cost</th>
          <th className="volume center">Volume</th>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <th className="waveform" />
          <th className="check center enabled">Enabled</th>
          <th className="check center subs-only">Subs only</th>
        </tr>
      </thead>
      <tbody>
        {items.map(i => (
          <ItemRow item={i} key={i._id} />
        ))}
      </tbody>
    </table>
  )

  function a() {
    console.log('b')
  }
}

export default ItemList
