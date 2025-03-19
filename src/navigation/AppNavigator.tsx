import { NavigationContainer } from '@react-navigation/native'
import { ScreenNavigator } from './ScreenNavigator'

// TODO: 딥링크 로직 추가
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <ScreenNavigator />
    </NavigationContainer>
  )
}

export default AppNavigator
