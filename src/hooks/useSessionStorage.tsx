import { Dispatch, SetStateAction, useState } from 'react'

export function useSessionStorage<T>(
  key: string,
  initialValue: T,
  forceReset?: boolean
): [T, Dispatch<SetStateAction<T>>] {
  const manipulatedKey = (adjustableKey: string) => `onscreensounds-${adjustableKey}`
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.sessionStorage.getItem(manipulatedKey(key))

      if (forceReset) {
        window.sessionStorage.removeItem(manipulatedKey(key))
      }

      return item && forceReset !== true ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(error)
      return initialValue
    }
  })

  const setValue = (value: T | SetStateAction<T>): void => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      window.sessionStorage.setItem(manipulatedKey(key), JSON.stringify(valueToStore))
    } catch (error) {
      console.error(error)
    }
  }

  return [storedValue, setValue]
}
