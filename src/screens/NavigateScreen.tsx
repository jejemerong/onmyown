import React from 'react'
import { Pressable, SafeAreaView, useColorScheme } from 'react-native'

import { useNavigation } from '@react-navigation/native'
import { Text } from 'react-native'

function NavigateScreen() {
  const theme = useColorScheme()
  const isDarkTheme = theme === 'dark'

  const navigation = useNavigation()

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: isDarkTheme ? 'black' : 'white',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Pressable onPress={() => navigation.navigate('Test')}>
        <Text>Test</Text>
      </Pressable>
      <Pressable onPress={() => navigation.navigate('StateTest')}>
        <Text>상태관리 화면</Text>
      </Pressable>
      <Pressable onPress={() => navigation.navigate('Home')}>
        <Text>Home</Text>
      </Pressable>
      <Pressable onPress={() => navigation.navigate('Login')}>
        <Text>Login</Text>
      </Pressable>
      <Pressable onPress={() => navigation.navigate('StreakTracker')}>
        <Text>Streak</Text>
      </Pressable>
    </SafeAreaView>
  )
}

export default NavigateScreen
