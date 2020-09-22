# react-flexy-table
most easy to use react table


# props

|     property    |   type   | default      |                                                              description                                                              |
|:---------------:|:--------:|--------------|:-------------------------------------------------------------------------------------------------------------------------------------:|
| data            | array    | []           | data for table                                                                                                                        |
| pageSize        | Number   | 5            | page size of the table                                                                                                                |
| filterable      | boolean  | false        | open filter inputs for table                                                                                                          |
| nonFilterCol    | array    | []           | if filterable open but you dont want to filter some cols you can use this.  array includes column names that you dont want to filter. |
| nonSortCol      | array    | []           | if you dont want to sort some cols you can use this. array includes column name that you dont want to sort.                           |
| pageSizeOptions | array    | [5,10,15,20] | represent page size select options                                                                                                    |
| onPageChange    | function |              | callback for page change                                                                                                              |
