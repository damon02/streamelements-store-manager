export const manipulatedKey = (adjustableKey: string) => `onscreensounds-${adjustableKey}`

export function loadFromLocalStorage<T = any>(key: string, defaultValue?: T) {
  try {
    const value = localStorage[manipulatedKey(key)]

    return value !== undefined ? JSON.parse(value) : defaultValue
  } catch (err) {
    console.error(err)
    return defaultValue
  }
}

export function saveToLocalStorage<T = any>(key: string, value: T) {
  try {
    localStorage[manipulatedKey(key)] = JSON.stringify(value)
  } catch (err) {
    console.error(err)
  }
}

export function removeFromLocalStorage(key: string) {
  try {
    delete localStorage[manipulatedKey(key)]
  } catch (err) {
    console.error(err)
  }
}
