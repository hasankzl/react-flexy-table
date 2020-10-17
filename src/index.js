import React, { useState } from 'react'
import styles from './styles.module.css'
import Head from './components/head/Head'
import Body from './components/body/Body'
import Pagination from './components/pagination/Paginition'
import PropTypes from 'prop-types'
const reactFlexyTable = ({
  data,
  pageSize,
  filterable,
  nonFilterCols,
  nonSortCols,
  additionalCols,
  pageSizeOptions,
  onPageChange,
  onPageSizeChange,
  onSortedChange,
  previousText,
  className,
  nextText,
  rowsText,
  pageText,
  ofText,
  searchText,
  totalDataText,
  filteredDataText,
  caseSensitive,
  sortable,
  globalSearch
}) => {
  const [virtualData, setVirtualData] = useState(data)
  const [queries, setQueries] = useState([])
  const [page, setPage] = useState(1)
  const [dataSize, setDataSize] = useState(pageSize)
  const keys = Object.keys(data[0])
  const dataCount = data.length
  const virtualDataCount = virtualData.length
  const maxPageSize = Math.ceil(virtualDataCount / dataSize)
  const colSpan = keys.length + additionalCols.length
  const defaultFilter = (d, newQueries) => {
    return newQueries.every((query) =>
      d[query.key].toString().toLowerCase().includes(query.search.toLowerCase())
    )
  }
  const defaultFilterCaseSensitive = (d, newQueries) => {
    return newQueries.every((query) =>
      d[query.key].toString().includes(query.search)
    )
  }

  const generalDefaultFilter = (d, query) => {
    return keys.some((key) => {
      return d[key].toString().toLowerCase().includes(query.toLowerCase())
    })
  }
  const generalDefaultFilterCaseSensitive = (d, query) => {
    return keys.some((key) => {
      return d[key].toString().includes(query)
    })
  }

  const handlePageSizeChange = (size) => {
    setDataSize(size)
    setPage(1)
    onPageSizeChange(size)
  }
  const handlePageChange = (page) => {
    if (page !== 0 && page <= maxPageSize) {
      setPage(page)
      onPageChange(page)
    }
  }
  const handleQueries = (query) => {
    let isIncluded = false
    const newQueries = queries.map((q) => {
      if (q.key === query.key) {
        isIncluded = true
        return query
      }
      return q
    })
    isIncluded === false && newQueries.push(query)
    setQueries(newQueries)

    filterVirtualData(newQueries)
  }

  const filterVirtualData = (newQueries) => {
    const isOk = (d) => {
      let isFit = false
      isFit = caseSensitive
        ? defaultFilterCaseSensitive(d, newQueries)
        : defaultFilter(d, newQueries)
      return isFit
    }
    const filteredData = data.filter((d) => isOk(d))
    setVirtualData(filteredData)
  }

  const generalFilterVirtualData = (query) => {
    const isOk = (d) => {
      let isFit = false
      isFit = caseSensitive
        ? generalDefaultFilterCaseSensitive(d, query)
        : generalDefaultFilter(d, query)
      return isFit
    }

    const filteredData = data.filter((d) => isOk(d))
    setVirtualData(filteredData)
  }

  const sortVirtualData = (sortBy, isAsc) => {
    // copy the state value
    const copyVirtualData = [...virtualData]
    copyVirtualData.sort((a, b) => {
      var x = a[sortBy]
      var y = b[sortBy]
      return x < y ? isAsc * 1 : x > y ? isAsc * -1 : 0
    })
    setVirtualData(copyVirtualData)
    onSortedChange(sortBy)
  }
  return (
    <div className={'rft-table-collapse ' + styles['rft-table-collapse']}>
      <table className={'rtf-table ' + styles['rft-table'] + ' ' + className}>
        <Head
          keys={keys}
          filterable={filterable}
          filterVirtualData={filterVirtualData}
          generalFilterVirtualData={generalFilterVirtualData}
          handleQueries={handleQueries}
          sortVirtualData={sortVirtualData}
          nonFilterCols={nonFilterCols}
          nonSortCols={nonSortCols}
          additionalCols={additionalCols}
          sortable={sortable}
          globalSearch={globalSearch}
          colSpan={colSpan}
          searchText={searchText}
        />
        <Body
          keys={keys}
          data={virtualData}
          pageSize={dataSize}
          page={page}
          additionalCols={additionalCols}
        />
        <Pagination
          handlePageChange={handlePageChange}
          page={page}
          maxPageSize={maxPageSize}
          dataCount={dataCount}
          handlePageSizeChange={handlePageSizeChange}
          pageSizeOptions={pageSizeOptions}
          filteredDataCount={virtualData.length}
          rowsText={rowsText}
          pageText={pageText}
          previousText={previousText}
          nextText={nextText}
          ofText={ofText}
          totalDataText={totalDataText}
          filteredDataText={filteredDataText}
          colSpan={colSpan}
        />
      </table>
    </div>
  )
}

reactFlexyTable.defaultProps = {
  data: [],
  pageSize: 5,
  filterable: false,
  sortable: false,
  nonFilterCols: [],
  nonSortCols: [],
  pageSizeOptions: [5, 10, 15, 20],
  previousText: 'Previous',
  nextText: 'Next',
  rowsText: 'rows',
  pageText: 'Page',
  ofText: 'of',
  totalDataText: 'Total data count',
  filteredDataText: 'Filtered data count',
  onPageChange: () => {},
  onSortedChange: () => {},
  onPageSizeChange: () => {},
  caseSensitive: false,
  additionalCols: [],
  className: '',
  globalSearch: false,
  searchText: 'Search'
}

reactFlexyTable.propTypes = {
  data: PropTypes.array,
  pageSize: PropTypes.number,
  filterable: PropTypes.bool,
  sortable: PropTypes.bool,
  nonFilterCols: PropTypes.array,
  nonSortCols: PropTypes.array,
  pageSizeOptions: PropTypes.array,
  onPageChange: PropTypes.func,
  onSortedChange: PropTypes.func,
  onPageSizeChange: PropTypes.func,
  previousText: PropTypes.string,
  nextText: PropTypes.string,
  rowsText: PropTypes.string,
  pageText: PropTypes.string,
  ofText: PropTypes.string,
  totalDataText: PropTypes.string,
  filteredDataText: PropTypes.string,
  caseSensitive: PropTypes.bool,
  additionalCols: PropTypes.array,
  className: PropTypes.string,
  globalSearch: PropTypes.bool,
  searchText: PropTypes.string
}
export default reactFlexyTable
