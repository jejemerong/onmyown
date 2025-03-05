import { useEffect, useState } from 'react'
import {
  View,
  Text,
  SafeAreaView,
  useColorScheme,
  Image,
  Linking,
} from 'react-native'
import { reduxStorage } from '../store/storage'

function ProfileScreen() {
  const theme = useColorScheme()
  const isDarkTheme = theme === 'dark'

  const [userID, setUserID] = useState('')
  const [level, setLevel] = useState(1)

  // TODO: useAppSelector 로 변경
  const [streak, setStreak] = useState(0)
  console.log('streak in ProfileScreen: ', streak)

  useEffect(() => {
    // 앱이 백그라운드일 때 딥링크로 열린 경우
    const getInitialURL = async () => {
      const url = await Linking.getInitialURL() // 딥링크
      // TODO: 백그라운드에서 url 없어진 케이스 핸들링
      if (url) {
        const selectedChallenge = await reduxStorage.getItem(
          'selectedChallenge',
        )
        console.log('selectedChallenge: ', selectedChallenge)
        let storedStreak = await reduxStorage.getItem('streak')
        console.log('storedStreak타입 ', storedStreak, typeof storedStreak)
        if (storedStreak === null) {
          setStreak(0)
        } else {
          setStreak(storedStreak)
        }
        if (selectedChallenge === '각자도생 스터디') {
          console.log('여기 들어오나')
          setStreak(storedStreak + 1)
          console.log('newStreak 타입 ', typeof storedStreak)
          await reduxStorage.setItem('streak', storedStreak + 1)
        }
      }
    }
    getInitialURL()

    // TODO: 포그라운드 딥링크 실행 로직 추가하기
  }, [])

  useEffect(() => {
    const getStoredStreak = async () => {
      const value = await reduxStorage.getItem('streak')
      setStreak(Number(value) || 0)
    }

    getStoredStreak()
  }, [])

  // TODO: 함수 모듈화 number to emoji => 231 => 2️⃣3️⃣1️⃣
  const numberToEmoji = (number: number) => {
    let num = number.toString()
    let result = ''

    for (let i = 0; i < num.length; i++) {
      result += num[i] + '️⃣'
    }

    return result
  }

  // TODO: 챌린지 데이터 받아오기
  const challenges = [
    {
      name: '각자도생 스터디',
      emoji: '📗',
      streak,
    },
    {
      name: '듀오링고',
      emoji: '🇩🇪',
      streak: 525,
    },
    {
      name: '짐박스 출석',
      emoji: '💪',
      streak: 3,
    },
  ]

  // const challenges = {
  //   '각자도생 스터디': {
  //     name: '각자도생 스터디',
  //     emoji: '📗',
  //     streak: 1,
  //   },
  //   듀오링고: {
  //     name: '듀오링고',
  //     emoji: '🇩🇪',
  //     streak: 525,
  //   },
  //   '짐박스 출석': {
  //     name: '짐박스 출석',
  //     emoji: '💪',
  //     streak: 3,
  //   },
  // }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: isDarkTheme ? 'black' : 'white',
        alignItems: 'center',
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: 'white',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 20,
        }}
      >
        {/* <View
          style={{
            width: 35,
            height: 35,
            justifyContent: 'center',
            borderRadius: 10,
            backgroundColor: 'white',
            shadowColor: 'black',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
          }}
        >
          <Text style={{ fontSize: 20, textAlign: 'center' }}>{'<'}</Text>
        </View> */}
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: 'black',
            textAlign: 'center',
          }}
        >
          프로필
        </Text>
      </View>
      {/* <View
        style={{
          width: 200,
          height: 200,
          borderRadius: 100,
          backgroundColor: '#EBCFF1',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            fontSize: 120,
            textAlign: 'center',
          }}
        >
          {emoji}
        </Text>
      </View> */}
      <Image
        source={require('../public/images/defaultProfile.png')}
        style={{
          width: 200,
          height: 200,
        }}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 5,
          marginTop: 20,
        }}
      >
        <Text
          style={{
            textAlign: 'center',
            fontSize: 17,
            color: 'black',
          }}
        >
          {userID}
        </Text>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 17,
            color: '#D9D9D9',
          }}
        >
          •
        </Text>
        <Text
          style={{
            fontSize: 17,
            color: 'black',
            textAlign: 'center',
          }}
        >
          Lv {numberToEmoji(level)}
        </Text>
      </View>
      <View
        style={{
          width: '80%',
          height: 1,
          backgroundColor: '#D9D9D9',
          marginTop: 20,
        }}
      />
      <View style={{ width: '65%', alignItems: 'baseline' }}>
        {challenges.map((challenge, index) => {
          return (
            <View
              key={index}
              style={{
                marginTop: 20,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <View
                style={{
                  width: 50,
                  height: 50,
                  justifyContent: 'center',
                  borderRadius: 100,
                  borderWidth: 1,
                  borderColor: '#D9D9D9',
                }}
              >
                <Text
                  style={{
                    fontSize: 25,
                    textAlign: 'center',
                  }}
                >
                  {challenge.emoji}
                </Text>
              </View>
              <Text style={{ fontSize: 17, fontWeight: 'bold' }}>
                {challenge.name}
              </Text>
              <Text style={{ fontSize: 17, fontWeight: 'bold' }}>
                🔥 {challenge.streak}
              </Text>
            </View>
          )
        })}
      </View>
    </SafeAreaView>
  )
}

export default ProfileScreen
