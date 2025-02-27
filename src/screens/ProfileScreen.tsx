import { useEffect, useState } from 'react'
import {
  View,
  Text,
  SafeAreaView,
  useColorScheme,
  Image,
  Linking,
} from 'react-native'
import { storage } from '../store/storage'

function ProfileScreen() {
  const theme = useColorScheme()
  const isDarkTheme = theme === 'dark'

  // TODO: 전역 상태 관리, storage 에서 데이터 가져오기
  const [level, setLevel] = useState(1)
  const [challenge, setChallenge] = useState('')
  const storagedStreak =
    storage.getNumber('streak') === undefined || null
      ? 0
      : storage.getNumber('streak')
  console.log('streak: ', storagedStreak)
  const [streak, setStreak] = useState(storagedStreak)

  if (storage.getString('streak') === undefined) {
    console.log('streak 없음')
    storage.set('streak', 0)
  }

  storage.set('user.ID', 'JEJE')
  const userID = storage.getString('user.ID')
  console.log('userId: ', userID)

  useEffect(() => {
    // 앱이 백그라운드일 때 딥링크로 열린 경우
    Linking.getInitialURL().then((url) => {
      console.log('백그라운드', storage.getAllKeys())
      if (url) {
        const selectedChallenge = storage.getString('selectedChallenge')
        console.log('selectedChallenge: ', selectedChallenge)
        if (selectedChallenge === '각자도생 스터디') {
          storage.set('streak', storagedStreak + 1)
          setStreak(streak + 1)
        } // TODO: 챌린지 검증 함수 추가
      }
    })

    // 앱이 포그라운드일 때 딥링크로 열린 경우
    const subscription = Linking.addEventListener('url', ({ url }) => {
      console.log('포그라운드')
      const selectedChallenge = storage.getString('selectedChallenge')
      console.log('selectedChallenge: ', selectedChallenge)
      if (selectedChallenge === '각자도생 스터디') {
        storage.set('streak', storagedStreak + 1)
        setStreak(streak + 1)
      } // TODO: 챌린지 검증 함수 추가
    })

    return () => {
      subscription.remove()
    }
  }, [])

  // number to emoji => 231 => 2️⃣3️⃣1️⃣
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
      streak: 1,
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
                🔥 {streak}
              </Text>
            </View>
          )
        })}
      </View>
    </SafeAreaView>
  )
}

export default ProfileScreen
