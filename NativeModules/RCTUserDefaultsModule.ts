import { NativeModules } from 'react-native'

const { UserDefaultsModule } = NativeModules

export const setItem = async (key: string, value: string) => {
  try {
    await UserDefaultsModule.setItem(key, value)
  } catch (error: any) {
    throw new Error('Error setting item: ' + error.message)
  }
}

export const getItem = async (key: string) => {
  try {
    return await UserDefaultsModule.getItem(key)
  } catch (error: any) {
    console.log('Error getting item: ' + error.message)
  }
}

export const removeItem = async (key: string) => {
  try {
    await UserDefaultsModule.removeItem(key)
  } catch (error: any) {
    throw new Error('Error removing item: ' + error.message)
  }
}

export const getAppGroupDirectory = async () => {
  try {
    const path = await UserDefaultsModule.getAppGroupDirectory()
    return path
  } catch (error) {
    console.error('Failed to get App Group directory:', error)
  }
}
