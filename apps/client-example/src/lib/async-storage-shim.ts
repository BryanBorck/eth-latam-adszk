// Minimal web-safe shim for '@react-native-async-storage/async-storage'
// Used to satisfy optional React Native imports in browser builds.
type Value = string | null

async function getItem(_key: string): Promise<Value> {
  return null
}

async function setItem(_key: string, _value: string): Promise<void> {
  // no-op
}

async function removeItem(_key: string): Promise<void> {
  // no-op
}

const AsyncStorage = { getItem, setItem, removeItem }

export default AsyncStorage
export { getItem, setItem, removeItem }


