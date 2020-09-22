# react-flexy-table
most easy to use react table


# props
|     property     |   type   | default               |                                                              description                                                              |
|:----------------:|:--------:|-----------------------|:-------------------------------------------------------------------------------------------------------------------------------------:|
| data             | array    | []                    | data for table                                                                                                                        |
| pageSize         | Number   | 5                     | page size of the table                                                                                                                |
| filterable       | boolean  | false                 | open filter inputs for table                                                                                                          |
| nonFilterCol     | array    | []                    | if filterable open but you dont want to filter some cols you can use this.  array includes column names that you dont want to filter. |
| nonSortCol       | array    | []                    | if you dont want to sort some cols you can use this. array includes column name that you dont want to sort.                           |
| pageSizeOptions  | array    | [5,10,15,20]          | represent page size select options                                                                                                    |
| onPageChange     | function |                       | callback for page change                                                                                                              |
| onSortedChange   | function |                       | callback for sorted change                                                                                                            |
| onPageSizeChange | funtion  |                       | callback for page size change                                                                                                         |
| previousText     | String   | "Previous"            | text for previos button                                                                                                               |
| nextText         | String   | "Next"                | text for next button                                                                                                                  |
| rowsText         | String   | "rows"                | text for rows                                                                                                                         |
| pageText         | String   | "page"                | text for page                                                                                                                         |
| ofText           | String   | "of"                  | text for of                                                                                                                           |
| totalDataText    | String   | "Total data count"    | text for total data                                                                                                                   |
| filteredDataText | String   | "Filtered data count" | text for filtered data                                                                                                                |
| caseSensitive    | Boolean  | false                 | controls search input case sensitive                                                                                                  |
| additionalCols   | Array    | []                    | additional cols for table                                                                                                             |
