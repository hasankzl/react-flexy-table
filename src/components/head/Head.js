import React, { useState } from 'react'
import styles from '../../styles.module.css'

function Head({ keys, filterable, handleQueries, sortVirtualData, nonFilterCol, nonSortCol, additionalCols }) {

  const [sortBy, setSortBy] = useState("")
  const handleSearch = (e) => {
    const newQuery = { key: e.target.name, search: e.target.value }
    console.log(newQuery)
    handleQueries(newQuery)
  }

  const handleSort = (key) => {
    // if clicked before chage asc
    const isAsc = sortBy === key ? -1 : 1;

    //if clicked bofore we need to change soryBy because we are checking for 3. and more click
    isAsc === -1 ? setSortBy(key + " clicked") : setSortBy(key);
    sortVirtualData(key, isAsc)
  }

  return (
    <thead>
      <tr>
        {keys.map(key => <th key={key} onClick={() => !nonSortCol.includes(key) && handleSort(key)}>{key}</th>)}
        {additionalCols.map(additionalCol => <th key={additionalCol.header}>{additionalCol.header}</th>)}
      </tr>
      {
        filterable &&
        <tr>
          {
            keys.map(key => !nonFilterCol.includes(key) ? <td key={key}><input name={key} onChange={handleSearch} type="text"></input></td> : <td></td>)
          }
          {additionalCols.map(() => <td></td>)}
        </tr>
      }
    </thead >
  )
}

export default Head
