import { Alert, AsyncStorage } from 'react-native'
import { checkNetworkConnection } from '../../_NetworkConnection'
import { loadFirebaseOnce } from '../InitializeFirebase'

import * as firebase from 'firebase'

export function getData (cb) {
  checkNetworkConnection()
  loadFirebaseOnce()

  AsyncStorage.getItem('ls_userid').then((localStorageUserid) => {
    if (localStorageUserid !== null) {
      firebase.database().ref('users/' + localStorageUserid).on('value', snap => cb(snap.val()))
    } else {
      Alert.alert('Cannot fetch data, local user profile not found!')
    }
  })
}
