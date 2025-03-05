import { Storage } from 'redux-persist'
import { MMKV } from 'react-native-mmkv'
import { getAppGroupDirectory } from '../../NativeModules/RCTUserDefaultsModule'

export async function initializeStorage() {
  let storage = null
  try {
    const path = await getAppGroupDirectory()
    if (path) {
      storage = new MMKV({
        id: 'onmyown',
        path,
      })
    }
  } catch (error) {
    console.error('Failed to initialize MMKV:', error)
  }
  return storage
}

export const reduxStorage: Storage = {
  setItem: async (key, value) => {
    const instance = await initializeStorage()
    if (instance) {
      // 데이터 타입 저장
      const type = typeof value
      instance.set(`${key}_type`, type)

      // 실제 데이터 저장
      if (type === 'string') {
        instance.set(key, value)
      } else if (type === 'number') {
        instance.set(key, value)
      } else if (type === 'boolean') {
        instance.set(key, value)
      }
      return true
    }
    return false
  },
  getItem: async (key) => {
    const instance = await initializeStorage()
    if (instance) {
      const type = instance.getString(`${key}_type`)
      console.log('instance.getString', key, type)

      if (type === 'string') {
        return instance.getString(key)
      } else if (type === 'number') {
        return instance.getNumber(key)
      } else if (type === 'boolean') {
        return instance.getBoolean(key)
      }
    }
    return null
  },
  removeItem: async (key) => {
    const instance = await initializeStorage()
    if (instance) {
      instance.delete(key)
      instance.delete(`${key}_type`)
    }
  },
}
