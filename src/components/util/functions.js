export const getProp = (object, path) => {
  if (path.length === 1) return object[path[0]]
  else if (path.length === 0) {
  } else {
    if (object[path[0]]) return getProp(object[path[0]], path.slice(1))
    else {
      object[path[0]] = {}
      return getProp(object[path[0]], path.slice(1))
    }
  }
}

export const DownloadJsonData = (JSONData, FileTitle, ShowLabel) => {
  //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
  var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData
  var CSV = ''
  //This condition will generate the Label/Header
  if (ShowLabel) {
    var row = ''
    //This loop will extract the label from 1st index of on array
    for (var index in arrData[0]) {
      //Now convert each value to string and comma-seprated
      row += index + ','
    }
    row = row.slice(0, -1)
    //append Label row with line break
    CSV += row + '\r\n'
  }
  //1st loop is to extract each row
  for (var i = 0; i < arrData.length; i++) {
    var row = ''
    //2nd loop will extract each column and convert it in string comma-seprated
    for (var index in arrData[i]) {
      row += '"' + arrData[i][index] + '",'
    }
    row.slice(0, row.length - 1)
    //add a line break after each row
    CSV += row + '\r\n'
  }
  if (CSV == '') {
    alert('Invalid data')
    return
  }
  //Generate a file name
  var filename = FileTitle
  var blob = new Blob([CSV], {
    type: 'text/csv;charset=utf-8;'
  })
  if (navigator.msSaveBlob) {
    // IE 10+
    navigator.msSaveBlob(blob, filename)
  } else {
    var link = document.createElement('a')
    if (link.download !== undefined) {
      // feature detection
      // Browsers that support HTML5 download attribute
      var url = URL.createObjectURL(blob)
      link.setAttribute('href', url)
      link.style = 'visibility:hidden'
      link.download = filename + '.csv'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }
}
