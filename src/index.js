import React, { useState, useEffect } from 'react'
import styles from './styles.module.css'
import Head from './components/head/Head'
import Body from './components/body/Body'
import Pagination from './components/pagination/Paginition'
import PropTypes from 'prop-types'
import { getProp, DownloadJsonData } from './components/util/functions'
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
  downloadExcelText,
  caseSensitive,
  sortable,
  globalSearch,
  downloadExcelProps,
  showExcelButton,
  columns,
  customFilters
}) => {
  const [virtualData, setVirtualData] = useState([...data])
  const [copyData, setCopyData] = useState([...data])
  const [queries, setQueries] = useState([])
  const [page, setPage] = useState(1)
  const [dataSize, setDataSize] = useState(pageSize)
  const [generalSearch, setGeneralSearch] = useState('')
  // maybe this is not the correct way to check if data is changed
  // but I couldn't find any other way and some how useEffect didn't work
  if (copyData !== data) {
    setCopyData(data)
    setVirtualData(data)
  }
  useEffect(() => {
    setPage(1)
    setQueries([])
    setGeneralSearch('')
  }, [data])

  let keys
  if (data.length === 0) {
    keys = []
  } else {
    keys = columns
      ? columns.map((col) => col.key).filter((col) => col !== undefined)
      : Object.keys(data[0])
  }

  const dataCount = data.length
  const virtualDataCount = virtualData.length
  const maxPageSize = Math.ceil(virtualDataCount / dataSize)
  const colSpan = columns ? columns.length : keys.length + additionalCols.length
  const defaultFilter = (d, newQueries) => {
    return newQueries.every((query) => {
      const prop = getProp(d, query.key.split('.'))
      if (prop) {
        return prop
          .toString()
          .toLowerCase()
          .includes(query.search.toLowerCase())
      } else {
        return query.search === ' '
      }
    })
  }
  const defaultFilterCaseSensitive = (d, newQueries) => {
    return newQueries.every((query) => {
      const prop = getProp(d, query.key.split('.'))
      if (prop) {
        return prop.toString().includes(query.search)
      } else {
        return query.search === ' '
      }
    })
  }

  const generalDefaultFilter = (d, query) => {
    return keys.some((key) => {
      const prop = getProp(d, key.split('.'))
      if (prop) {
        return prop.toString().toLowerCase().includes(query.toLowerCase())
      } else {
        return query.search === ' '
      }
    })
  }
  const generalDefaultFilterCaseSensitive = (d, query) => {
    return keys.some((key) => {
      const prop = getProp(d, key.split('.'))
      if (prop) {
        return prop.toString().includes(query)
      } else {
        return query.search === ' '
      }
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
    setPage(1)
    setVirtualData(filteredData)
  }

  const generalFilterVirtualData = (query) => {
    setGeneralSearch(query)
    const isOk = (d) => {
      let isFit = false
      isFit = caseSensitive
        ? generalDefaultFilterCaseSensitive(d, query)
        : generalDefaultFilter(d, query)
      return isFit
    }

    const filteredData = data.filter((d) => isOk(d))
    setVirtualData(filteredData)
    setPage(1)
  }

  const sortVirtualData = (sortBy, isAsc) => {
    // copy the state value
    const copyVirtualData = [...virtualData]
    copyVirtualData.sort((a, b) => {
      var x = a[sortBy]
      var y = b[sortBy]
      if (x === null) {
        return 1
      } else if (y === null) {
        return -1
      }
      return x < y ? isAsc * 1 : x > y ? isAsc * -1 : 0
    })
    setVirtualData(copyVirtualData)
    onSortedChange(sortBy)
  }

  const downloadExcelFunc = () => {
    let downloadData

    switch (downloadExcelProps.type) {
      case 'filtered':
        downloadData = virtualData
        break
      case 'paged':
        downloadData = virtualData.slice(0, pageSize)
        break
      case 'all':
        downloadData = data
        break
      default:
        downloadData = virtualData
    }
    DownloadJsonData(
      downloadData,
      downloadExcelProps.title,
      downloadExcelProps.showLabel
    )
  }
  return (
    <div className={'rft-table-collapse ' + styles['rft-table-collapse']}>
      <table
        className={'rtf-table ' + styles['rft-table'] + ' ' + className}
        id='rft-table-id'
      >
        <Head
          keys={keys}
          filterable={filterable}
          filterVirtualData={filterVirtualData}
          generalFilterVirtualData={generalFilterVirtualData}
          queries={queries}
          handleQueries={handleQueries}
          sortVirtualData={sortVirtualData}
          nonFilterCols={nonFilterCols}
          nonSortCols={nonSortCols}
          additionalCols={additionalCols}
          sortable={sortable}
          globalSearch={globalSearch}
          colSpan={colSpan}
          searchText={searchText}
          columns={columns}
          generalSearch={generalSearch}
          customFilters={customFilters}
        />
        <Body
          keys={keys}
          data={virtualData}
          pageSize={dataSize}
          page={page}
          additionalCols={additionalCols}
          columns={columns}
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
          downloadExcelText={downloadExcelText}
          totalDataText={totalDataText}
          filteredDataText={filteredDataText}
          colSpan={colSpan}
          downloadExcelFunc={downloadExcelFunc}
          showExcelButton={showExcelButton}
          pageSize={pageSize}
        />
      </table>
    </div>
  )
}

reactFlexyTable.defaultProps = {
  data: [],
  columns: null,
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
  downloadExcelText: 'Download Excel',
  downloadExcelProps: {
    type: 'all',
    title: 'table.xls',
    showLabel: true
  },
  onPageChange: () => {},
  onSortedChange: () => {},
  onPageSizeChange: () => {},
  caseSensitive: false,
  additionalCols: [],
  className: '',
  globalSearch: false,
  searchText: 'Search',
  showExcelButton: false,
  customFilters: {}
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
  downloadExcelText: PropTypes.string,
  showExcelButton: PropTypes.bool,
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
