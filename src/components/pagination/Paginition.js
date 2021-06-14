import React from 'react'
import styles from '../../styles.module.css'

function Pagination({
  handlePageChange,
  page,
  maxPageSize,
  dataCount,
  pageSizeOptions,
  pageSize,
  handlePageSizeChange,
  filteredDataCount,
  previousText,
  nextText,
  rowsText,
  pageText,
  ofText,
  totalDataText,
  filteredDataText,
  downloadExcelText,
  colSpan,
  showExcelButton,
  downloadExcelFunc
}) {
  return (
    <tfoot>
      <tr>
        <td colSpan={colSpan}>
          <div className={'rft-pagination ' + styles['rft-pagination']}>
            <button
              className={
                'rft-pagination-button ' + styles['rft-pagination-button']
              }
              onClick={() => handlePageChange(page - 1)}
            >
              {previousText}
            </button>
            <span
              className={'rft-filtered-text ' + styles['rft-filtered-text']}
            >
              {filteredDataText} {filteredDataCount}
            </span>

            <span
              className={'rft-totaldata-text ' + styles['rft-totaldata-text']}
            >
              {totalDataText} {dataCount}
            </span>

            <div>
              <label className={'rft-page-text ' + styles['rft-page-text']}>
                {pageText}
              </label>
              <input
                type='number'
                value={page}
                onChange={(e) => handlePageChange(Number(e.target.value))}
                max={maxPageSize}
                min={1}
              />
              <label className={'rft-page-text ' + styles['rft-page-text']}>
                {ofText} {maxPageSize}
              </label>
            </div>

            <div>
              <select
                onChange={(e) => handlePageSizeChange(Number(e.target.value))}
                defaultValue={pageSize}
              >
                {pageSizeOptions.map((pso) => (
                  <option key={pso} value={pso}>
                    {rowsText} {pso}
                  </option>
                ))}
              </select>
            </div>
            {showExcelButton && (
              <button
                className={'rft-excel-button ' + styles['rft-excel-button']}
                onClick={() => downloadExcelFunc()}
              >
                {downloadExcelText}
              </button>
            )}
            <button
              className={
                'rft-pagination-button ' + styles['rft-pagination-button']
              }
              onClick={() => handlePageChange(page + 1)}
            >
              {nextText}
            </button>
          </div>
        </td>
      </tr>
    </tfoot>
  )
}

export default Pagination
