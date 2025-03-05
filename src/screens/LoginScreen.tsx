import { useNavigation } from '@react-navigation/native'
import React, { useEffect } from 'react'
import { Image, Pressable, Text, useColorScheme, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { appleAuth } from '@invertase/react-native-apple-authentication'
import CharacterImg from '../components/CharacterImg'
import styled from 'styled-components'
import { reduxStorage } from '../store/storage'

const LoginScreen = () => {
  const navigation = useNavigation()
  const theme = useColorScheme()
  const isDarkTheme = theme === 'dark'

  async function onAppleButtonPress() {
    // performs login request
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      // Note: it appears putting FULL_NAME first is important, see issue #293
      requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
    })

    // get current authentication state for user
    // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
    const credentialState = await appleAuth.getCredentialStateForUser(
      appleAuthRequestResponse.user,
    )
    console.log(
      'credentialState: ',
      appleAuthRequestResponse.fullName?.familyName,
      appleAuthRequestResponse.fullName?.givenName,
      appleAuthRequestResponse.email,
    ) // fullName: {"familyName": "오", "givenName": "모", "middleName": null, "namePrefix": null, "nameSuffix": null, "nickname": null}

    const username =
      appleAuthRequestResponse.fullName?.familyName +
      appleAuthRequestResponse.fullName?.givenName
    const email = appleAuthRequestResponse.email

    // use credentialState response to ensure the user is authenticated
    if (credentialState === appleAuth.State.AUTHORIZED) {
      if (username) {
        reduxStorage.setItem('isLoggedIn', true)
        reduxStorage.setItem('username', username)
        reduxStorage.setItem('appleId', username)
        reduxStorage.setItem('emoji', '😈')
        reduxStorage.setItem('streak', 0)
      }
      if (email) {
        reduxStorage.setItem('email', email)
      }
      // user is authenticated
      navigation.navigate('Profile')
    }
  }

  useEffect(() => {
    // onCredentialRevoked returns a function that will remove the event listener. useEffect will call this function when the component unmounts
    return appleAuth.onCredentialRevoked(async () => {
      console.warn(
        'If this function executes, User Credentials have been Revoked',
      )
    })
  }, []) // passing in an empty array as the second argument ensures this is only ran once

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: isDarkTheme ? 'black' : 'white',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Title isDarkTheme={isDarkTheme}>꺼몬</Title>
      <View style={{ marginTop: 30 }} />
      <CharacterImg />

      <Pressable
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          width: 220,
          height: 45,
          marginTop: 10,
          backgroundColor: '#000',
          borderStyle: 'solid 5px black',
          borderRadius: 7,
        }}
        onPress={() => onAppleButtonPress()}
      >
        <Text
          style={{
            color: 'white',
            fontSize: 17,
            textAlign: 'center',
          }}
        >
          <Image
            source={require('../public/images/apple.logo.png')}
            style={{ width: 12, height: 15, marginRight: 10 }}
          />
          Apple ID 로 로그인
        </Text>
      </Pressable>
      <Pressable
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 15,
          width: 220,
          height: 45,
          backgroundColor: '#FFF',
          borderRadius: 7,
        }}
        onPress={() => navigation.navigate('Home')}
      >
        <Image
          source={require('../public/images/1024.png')}
          style={{
            width: 25,
            height: 25,
            marginRight: 5,
          }}
        />
        <Text
          style={{
            fontSize: 17,
            textAlign: 'center',
          }}
        >
          omo ID 로 로그인
        </Text>
      </Pressable>
    </SafeAreaView>
  )
}

export default LoginScreen

const Title = styled.Text<{ isDarkTheme: boolean }>`
  text-align: center;
  font-family: 'MinSans-Bold';
  font-weight: bold;
  font-size: 35px;
  color: ${(props) => (props.isDarkTheme ? 'white' : 'black')};
`
