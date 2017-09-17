import { AsyncStorage } from 'react-native'
import { checkNetworkConnection } from '../../_NetworkConnection'
import { loadFirebaseOnce } from '../InitializeFirebase'

import * as firebase from 'firebase'

export function removeData () {
  checkNetworkConnection()
  loadFirebaseOnce()

  AsyncStorage.getItem('ls_userid').then((localStorageUserid) => {
    let getLocalStorageUserid = localStorageUserid
    firebase.database().ref('users/' + getLocalStorageUserid + '/email').remove()
  })
}
