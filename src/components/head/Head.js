import React, { useState } from 'react'
import styles from '../../styles.module.css'

function Head({ keys, filterable, handleQueries, sortVirtualData, nonFilterCols, nonSortCols, additionalCols, sortable }) {

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
        {keys.map(key => <th key={key} onClick={() => sortable && !nonSortCols.includes(key) && handleSort(key)}>{key}</th>)}
        {additionalCols.map((additionalCol, index) => <th key={index}>{additionalCol.header}</th>)}
      </tr>
      {
        filterable == true &&
        <tr>
          {
            keys.map(key => !nonFilterCols.includes(key) ? <td key={key}><input name={key} onChange={handleSearch} type="text"></input></td> : <td></td>)
          }
          {additionalCols.map((data, key) => <td key={key}></td>)}
        </tr>
      }
    </thead >
  )
}

export default Head
