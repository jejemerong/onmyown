import React from 'react'
import { SafeAreaView, useColorScheme } from 'react-native'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { LoginScreen, ProfileScreen } from './screens'
import { useAppSelector } from './store/storage'

// createClient
const queryClient = new QueryClient()

const Stack = createNativeStackNavigator()

const App = () => {
  const theme = useColorScheme()
  const isDarkTheme = theme === 'dark'

  const isLoggedIn = useAppSelector((state) => state.root.user.isLoggedIn)
  console.log('현재 로그인 상태: ', isLoggedIn)

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: isDarkTheme ? 'black' : 'white' }}
    >
      {/* TODO: RootNavigationContainer 로 변경 */}
      <NavigationContainer>
        <Stack.Navigator initialRouteName={isLoggedIn ? 'Profile' : 'Login'}>
          <Stack.Screen
            name="Profile"
            options={{ headerShown: false }}
            component={ProfileScreen}
          />
          <Stack.Screen
            name="Login"
            options={{ headerShown: false }}
            component={LoginScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  )
}

export default App
