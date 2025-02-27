import { MMKV } from 'react-native-mmkv'
import { getAppGroupDirectory } from '../../NativeModules/RCTUserDefaultsModule'

// 사용 예시
getAppGroupDirectory().then((path) => {
  console.log('Storage Path:', path)
})

// TODO: path 변수로 수정, 각 디렉토리가 어떤 걸 의미하는지 변수로 치환할 수 있는지 테스트하기
export const storage = new MMKV({
  id: 'onmyown',
  path: `/private/var/mobile/Containers/Shared/AppGroup/44FFCCC1-541E-4D7F-B40C-DA359C0A8C8F`,
})
