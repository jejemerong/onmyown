import { useEffect, useState } from 'react'
import {
  View,
  Text,
  SafeAreaView,
  useColorScheme,
  Image,
  Linking,
} from 'react-native'
import {
  challengeSlice,
  mmkvStorage,
  useAppDispatch,
  useAppSelector,
} from '../store/storage'

function ProfileScreen() {
  const theme = useColorScheme()
  const isDarkTheme = theme === 'dark'

  const dispatch = useAppDispatch()

  const username = useAppSelector((state) => state.root.user.name)
  const [level, setLevel] = useState(1)

  const streak = useAppSelector((state) => state.root.challenge.streak)
  console.log('streak 11111111', streak)

  useEffect(() => {
    // 앱이 백그라운드일 때 딥링크로 열린 경우
    const getInitialURL = async () => {
      let url = await Linking.getInitialURL() // 딥링크
      const selectedChallenge = await mmkvStorage.getItem('selectedChallenge')
      console.log('selectedChallenge: ', selectedChallenge)
      // TODO: 백그라운드에서 url 없어진 케이스 핸들링
      if (url) {
        console.log('selectedChallenge: ', selectedChallenge)

        if (selectedChallenge === '각자도생 스터디') {
          console.log('streak 22222222', streak)
          dispatch(
            challengeSlice.actions.setChallenge({
              challengeName: selectedChallenge,
              streak: streak + 1,
            }),
          )
          mmkvStorage.setItem('selectedChallenge', '')
        }
      }
    }
    getInitialURL()

    // TODO: 포그라운드 딥링크 실행 로직 추가하기
  }, [streak])

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
          {username}
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
