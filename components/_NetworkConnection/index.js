import { Alert, NetInfo } from 'react-native'

export function checkNetworkConnection () {
  NetInfo.isConnected.fetch().then(isConnected => {
  })
  function handleFirstConnectivityChange (isConnected) {
    Alert.alert('Your Network Connection is ' + (isConnected ? 'online' : 'offline!'))
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
