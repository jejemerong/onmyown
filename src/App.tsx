import React from 'react'
import { SafeAreaView, useColorScheme } from 'react-native'
import AppNavigator from './navigation/AppNavigator'

const App = () => {
  // TODO: SafeAreaView 컴포넌트화
  const theme = useColorScheme()
  const isDarkTheme = theme === 'dark'

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: isDarkTheme ? 'black' : 'white' }}
    >
      <AppNavigator />
    </SafeAreaView>
  )
}

export default App
