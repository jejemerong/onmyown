import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createStaticNavigation } from '@react-navigation/native'
import {
  HomeScreen,
  LoginScreen,
  StreakTrackerScreen,
  ProfileScreen,
  TestScreen,
} from '../screens'
import NavigateScreen from '../screens/NavigateScreen'

const RootStack = createNativeStackNavigator({
  screens: {
    Navigate: {
      screen: NavigateScreen,
      options: { headerShown: false },
    },
    Profile: {
      screen: ProfileScreen,
      options: { headerShown: false },
    },
    Test: {
      screen: TestScreen,
      options: { headerShown: false },
    },
    Home: {
      screen: HomeScreen,
      options: { headerShown: false },
    },
    Login: {
      screen: LoginScreen,
      options: { headerShown: false },
    },
    StreakTracker: {
      screen: StreakTrackerScreen,
      options: { headerShown: false },
    },
  },
})
const RootNavigation = createStaticNavigation(RootStack)

export default RootNavigation
