import { Alert, NetInfo } from 'react-native'

export function checkNetworkConnection () {
  NetInfo.isConnected.fetch().then(isConnected => {
  })
  function handleFirstConnectivityChange (isConnected) {
    if (!isConnected) {
      Alert.alert('No network connection! The application needs network connection to work properly.')
    }
    NetInfo.isConnected.removeEventListener(
      'connectionChange',
      handleFirstConnectivityChange
    )
  }
  NetInfo.isConnected.addEventListener(
    'connectionChange',
    handleFirstConnectivityChange
  )
}
