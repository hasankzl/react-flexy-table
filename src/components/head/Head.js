import React, { useState } from 'react'
import styles from '../../styles.module.css'

function Head({
  keys,
  filterable,
  handleQueries,
  sortVirtualData,
  nonFilterCols,
  nonSortCols,
  additionalCols,
  sortable,
  globalSearch,
  generalFilterVirtualData,
  colSpan,
  searchText,
  columns,
  queries,
  generalSearch
}) {
  const [sortBy, setSortBy] = useState('')
  const handleSearch = (e) => {
    const newQuery = { key: e.target.name, search: e.target.value }
    handleQueries(newQuery)
  }
  const handleGeneralSearch = (e) => {
    const query = e.target.value
    generalFilterVirtualData(query)
  }
  const handleSort = (key) => {
    // if clicked before chage asc
    const isAsc = sortBy === key ? -1 : 1

    // if clicked bofore we need to change soryBy because we are checking for 3. and more click
    isAsc === -1 ? setSortBy(key + ' clicked') : setSortBy(key)
    sortVirtualData(key, isAsc)
  }

  return (
    <thead>
      {globalSearch && (
        <tr className='rft-gs-tr'>
          <td colSpan={colSpan - 1} />
          <td className={'rft-gs-td ' + styles['rft-gs-td']}>
            <span>{searchText}</span>
            <input
              className={'rft-gs-input ' + styles['rft-gs-input']}
              type='text'
              onChange={handleGeneralSearch}
              value={generalSearch}
            />
          </td>
        </tr>
      )}
      <tr>
        {columns
          ? columns.map((col) => (
              <th
                key={col.key}
                onClick={() =>
                  sortable &&
                  !nonSortCols.includes(col.key) &&
                  handleSort(col.key)
                }
              >
                {col.header}
              </th>
            ))
          : keys.map((key) => (
              <th
                key={key}
                onClick={() =>
                  sortable && !nonSortCols.includes(key) && handleSort(key)
                }
              >
                {key.replace('_', ' ')}
              </th>
            ))}
        {!columns &&
          additionalCols.map((additionalCol, index) => (
            <th key={index}>{additionalCol.header.replace('_', ' ')}</th>
          ))}
      </tr>
      {filterable === true && (
        <tr>
          {columns
            ? columns.map((col) =>
                !nonFilterCols.includes(col.key) && col.key ? (
                  <td key={col.key}>
                    <input name={col.key} onChange={handleSearch} type='text' />
                  </td>
                ) : (
                  <td />
                )
              )
            : keys.map((key) =>
                !nonFilterCols.includes(key) ? (
                  <td key={key}>
                    <input
                      name={key}
                      onChange={handleSearch}
                      type='text'
                      value={
                        !queries.find((query) => query.key === key)
                          ? ''
                          : queries.find((query) => query.key === key).search
                      }
                    />
                  </td>
                ) : (
                  <td />
                )
              )}
          {!columns && additionalCols.map((data, key) => <td key={key} />)}
        </tr>
      )}
    </thead>
  )
}

export default Head
