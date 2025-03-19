import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useAppSelector } from '../store/storage'
import {
  HomeScreen,
  LoginScreen,
  ProfileScreen,
  NavigateScreen,
  TestScreen,
  StreakTrackerScreen,
} from '../screens'

export const ScreenNavigator = () => {
  const Stack = createNativeStackNavigator()
  const isLoggedIn = useAppSelector((state) => state.root.user.isLoggedIn)
  console.log('현재 로그인 상태: ', isLoggedIn)
  return (
    <Stack.Navigator initialRouteName={isLoggedIn ? 'Profile' : 'Login'}>
      <Stack.Screen
        name="Login"
        options={{ headerShown: false }}
        component={LoginScreen}
      />
      <Stack.Screen
        name="Home"
        options={{ headerShown: false }}
        component={HomeScreen}
      />
      <Stack.Screen
        name="Profile"
        options={{ headerShown: false }}
        component={ProfileScreen}
      />
      <Stack.Screen
        name="StreakTracker"
        options={{ headerShown: false }}
        component={StreakTrackerScreen}
      />
      <Stack.Screen
        name="Navigate"
        options={{ headerShown: false }}
        component={NavigateScreen}
      />
      <Stack.Screen
        name="Test"
        options={{ headerShown: false }}
        component={TestScreen}
      />
    </Stack.Navigator>
  )
}
