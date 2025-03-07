import { Storage } from 'redux-persist'
import { MMKV } from 'react-native-mmkv'
import { getAppGroupDirectory } from '../../NativeModules/RCTUserDefaultsModule'
import { combineReducers, configureStore, createSlice } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

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

export const mmkvStorage: Storage = {
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

export interface UserState {
  name: string
  email: string | null
  isLoggedIn: boolean
}

export interface ChallengeState {
  challengeName: string
  streak: number
}

export interface TotalState {
  user: UserState
  challenge: ChallengeState
}

export const initialState: TotalState = {
  user: {
    isLoggedIn: false,
    name: '로그인이 필요합니다.',
    email: '이메일을 등록하세요',
  },
  challenge: { streak: 0, challengeName: '챌린지를 선택해주세요.' },
}

// TODO: 위 slice 함수처럼 setUser 함수를 정의하면 SET_USER 액션 타입이 필요없나?
export const userSlice = createSlice({
  name: 'user',
  initialState: initialState.user,
  reducers: {
    setUser: (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn
      state.name = action.payload.name
      state.email = action.payload.email
    },
  },
})

export const challengeSlice = createSlice({
  name: 'challenge',
  initialState: initialState.challenge,
  reducers: {
    setChallenge: (state, action) => {
      state.challengeName = action.payload.challengeName
      state.streak = action.payload.streak
    },
  },
})

export const { setUser } = userSlice.actions
export const { setChallenge } = challengeSlice.actions

const persistConfig = {
  key: 'root',
  version: 1,
  storage: mmkvStorage,
}

const reducers = combineReducers({
  user: userSlice.reducer,
  challenge: challengeSlice.reducer,
})

const persistedReducer = persistReducer(persistConfig, reducers)

export const reducer = {
  root: persistedReducer,
}

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
