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
