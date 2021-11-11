import produce from 'immer'
import cloneDeep from 'lodash/cloneDeep'
import get from 'lodash/get'

export function sortByKey<T>(array: T[], key: string, order: 'asc' | 'desc' = 'asc'): T[] {
  return produce(array, draft =>
    draft.sort((a, b) => {
      const less = order === 'asc' ? -1 : 1
      const more = order === 'asc' ? 1 : -1
      const x = get(a, key)
      const y = get(b, key)

      if (x && y) {
        return x < y ? less : x > y ? more : 0
      }
      if (!x) {
        return 1
      }
      return -1
    })
  )
}

export function queryStringToObject(query: string): { [key: string]: string } {
  let splitObject = cloneDeep(query)

  // Remove ?
  if (splitObject.charAt(0) === '?') {
    splitObject = splitObject.slice(1)
  }

  // Create array by splitting on &
  const splittedQuery = splitObject.split('&')
  const keyValueObj: { [key: string]: string } = {}
  // Make key value objects ( key=value -> {key: value} )
  splittedQuery.forEach(queryParam => {
    const keyValue = queryParam.split('=')
    if (keyValue[1]) {
      // eslint-disable-next-line prefer-destructuring
      keyValueObj[keyValue[0]] = keyValue[1]
    }
  })

  return keyValueObj
}

export function objectToQueryString(object: {
  [key: string]: string | number | boolean | undefined
}): string {
  if (Object.keys(object).length === 0) {
    return ''
  }

  const str = `?${Object.keys(object)
    .reduce((a: string[], k) => {
      const value = object[k]
      if (value || value === 0 || value === false) {
        a.push(`${k}=${encodeURIComponent(value)}`)
      }
      return a
    }, [])
    .join('&')}`

  return str
}
