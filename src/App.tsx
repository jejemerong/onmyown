import React, { useEffect, useState } from 'react'
import { SafeAreaView, useColorScheme } from 'react-native'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { HomeScreen, LoginScreen, ProfileScreen } from './screens'
import { reduxStorage } from './store/storage'

// createClient
const queryClient = new QueryClient()

const Stack = createNativeStackNavigator()

const App = () => {
  const theme = useColorScheme()
  const isDarkTheme = theme === 'dark'
  // TODO: useAppSelector 로 변경
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    reduxStorage.getItem('isLoggedIn').then((isLoggedIn: boolean) => {
      console.log('isLoggedIn', isLoggedIn)
      setIsLoggedIn(isLoggedIn)
    })
  }, [])

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: isDarkTheme ? 'black' : 'white' }}
    >
      <QueryClientProvider client={queryClient}>
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
      </QueryClientProvider>
    </SafeAreaView>
  )
}

export default App
