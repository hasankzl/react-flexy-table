import React, { useState } from 'react'
import styles from './styles.module.css'
import Head from "./components/head/Head"
import Body from "./components/body/Body"
import Pagination from "./components/pagination/Paginition"

const reactFlexyTable = ({ data, pageSize, filterable, nonFilterCol, nonSortCol, additionalCols, pageSizeOptions, onPageChange, onPageSizeChange, onSortedChange, previousText, nextText, rowsText, pageText, ofText, totalDataText, filteredDataText, caseSensitive }) => {
  const [virtualData, setVirtualData] = useState(data)
  const [queries, setQueries] = useState([]);
  const [page, setPage] = useState(1);
  const [dataSize, setDataSize] = useState(pageSize);
  const keys = Object.keys(data[0]);
  const dataCount = data.length;
  const virtualDataCount = virtualData.length;
  const maxPageSize = Math.ceil(virtualDataCount / dataSize);

  const defaultFilter = (d, newQueries) => {
    return newQueries.every(query => d[query.key].toString().toLowerCase().includes(query.search.toLowerCase()))
  }
  const defaultFilterCaseSensitive = (d, newQueries) => {
    return newQueries.every(query => d[query.key].toString().includes(query.search))
  }
  const handlePageSizeChange = size => {
    setDataSize(size)
    setPage(1)
    onPageSizeChange(size);
  }
  const handlePageChange = page => {
    if (page != 0 && page <= maxPageSize) {
      setPage(page)
      onPageChange(page)
    }
  }
  const handleQueries = (query) => {
    let isIncluded = false;
    const newQueries = queries.map(q => {
      if (q.key == query.key) {
        isIncluded = true;
        return query;
      }
      return q;
    })
    isIncluded == false ? newQueries.push(query) : null;
    setQueries(newQueries);

    filterVirtualData(newQueries);
  }

  const filterVirtualData = (newQueries) => {
    const isOk = (d) => {
      let isFit = false;
      isFit = caseSensitive ? defaultFilterCaseSensitive(d, newQueries) : defaultFilter(d, newQueries);
      return isFit;
    }
    const filteredData = data.filter(d => isOk(d));
    setVirtualData(filteredData)

  }

  const sortVirtualData = (sortBy, isAsc) => {

    //copy the state value
    const copyVirtualData = [...virtualData];

    copyVirtualData.sort((a, b) => {
      var x = a[sortBy]; var y = b[sortBy];
      return ((x < y) ? (isAsc * 1) : ((x > y) ? (isAsc * -1) : 0));
    });
    setVirtualData(copyVirtualData)
    onSortedChange(sortBy);
  }
  return (
    <div >
      <table className={"rtf-table " + styles["rft-table"]}>
        <Head keys={keys} filterable={filterable} filterVirtualData={filterVirtualData} handleQueries={handleQueries} sortVirtualData={sortVirtualData} nonFilterCol={nonFilterCol} nonSortCol={nonSortCol} additionalCols={additionalCols} />
        <Body keys={keys} data={virtualData} pageSize={dataSize} page={page} additionalCols={additionalCols} />
        <Pagination handlePageChange={handlePageChange} page={page} maxPageSize={maxPageSize} dataCount={dataCount} handlePageSizeChange={handlePageSizeChange} pageSizeOptions={pageSizeOptions} filteredDataCount={virtualData.length}
          rowsText={rowsText} pageText={pageText} previousText={previousText} nextText={nextText} ofText={ofText} totalDataText={totalDataText} filteredDataText={filteredDataText} colSpan={keys.length + 1} />
      </table>
    </div>
  )
}

reactFlexyTable.defaultProps = {
  data: [],
  pageSize: 5,
  filterable: false,
  nonFilterCol: [],
  nonSortCol: [],
  pageSizeOptions: ["5", "10", "15"],
  previousText: "Previous",
  nextText: "Next",
  rowsText: "rows",
  pageText: "Page",
  ofText: "of",
  totalDataText: "Total data count",
  filteredDataText: "Filtered data count",
  onPageChange: () => { },
  onSortedChange: () => { },
  onPageSizeChange: () => { },
  caseSensitive: false
}

reactFlexyTable.propTypes = {
  data: Array,
  pageSize: Number,
  filterable: Boolean,
  nonFilterCol: Array,
  nonSortCol: Array,
  pageSizeOptions: Array,
  onPageChange: Function,
  onSortedChange: Function,
  onPageSizeChange: Function,

}
export default reactFlexyTable;
