import React from 'react'

import './FilterHeader.scss'

interface IProps {
  query: string
  setQuery: (query: string) => void
  minVolume: number | undefined
  setMinVolume: (minVolume: number | undefined) => void
  maxVolume: number | undefined
  setMaxVolume: (minVolume: number | undefined) => void
  minCost: number | undefined
  setMinCost: (minVolume: number | undefined) => void
  maxCost: number | undefined
  setMaxCost: (minVolume: number | undefined) => void
}

const FilterHeader = ({
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
}: IProps) => (
  <div className="filter-header">
    <div className="filter-item">
      <h3>Search</h3>
      <input
        placeholder="Search by sound name"
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
    </div>
    <div className="filter-item">
      <h3>Volume</h3>
      <div className="flex">
        <input
          className={(minVolume || 0) < (maxVolume || 0) ? 'warn' : ''}
          type="number"
          value={minVolume}
          placeholder="Min"
          min={0}
          max={99}
          onChange={e => setMinVolume(parseInt(e.target.value, 10))}
        />
        <input
          className={(minVolume || 0) < (maxVolume || 0) ? 'warn' : ''}
          type="number"
          value={maxVolume}
          placeholder="Max"
          min={1}
          max={100}
          onChange={e => setMaxVolume(parseInt(e.target.value, 10))}
        />
      </div>
    </div>
    <div className="filter-item">
      <h3>Cost</h3>
      <div className="flex">
        <input
          className={(minCost || 0) < (maxCost || 0) ? 'warn' : ''}
          type="number"
          value={minCost}
          placeholder="Min"
          min={0}
          max={9999999999}
          onChange={e => setMinCost(parseInt(e.target.value, 10))}
        />
        <input
          className={(minCost || 0) < (maxCost || 0) ? 'warn' : ''}
          type="number"
          value={maxCost}
          placeholder="Max"
          min={1}
          max={1000000000}
          onChange={e => setMaxCost(parseInt(e.target.value, 10))}
        />
      </div>
    </div>
  </div>
)

export default FilterHeader
