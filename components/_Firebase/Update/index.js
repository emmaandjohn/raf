import { Alert, AsyncStorage } from 'react-native'
import { checkNetworkConnection } from '../../_NetworkConnection'
import { loadFirebaseOnce } from '../InitializeFirebase'

import * as firebase from 'firebase'

export function updateData (newUsername, newEmail) {
  checkNetworkConnection()
  loadFirebaseOnce()

  AsyncStorage.getItem('ls_userid').then((localStorageUserid) => {
    let getLocalStorageUserid = localStorageUserid
    let updatedStorageUsername = newUsername
    let udpatedStorageEmail = newEmail

    // Update Firebase Data
    try {
      let getUserdata = firebase.database().ref('users/' + getLocalStorageUserid)
      getUserdata.update({ username: updatedStorageUsername, email: udpatedStorageEmail })
    } catch (error) {
      Alert.alert('Error Update Database!')
    }
    // Update Localstorage Data
    try {
      AsyncStorage.setItem('ls_username', updatedStorageUsername).then((data) => {})
      AsyncStorage.setItem('ls_email', udpatedStorageEmail).then((data) => {})
    } catch (error) {
      Alert.alert('Error Update Local Profile!')
    }
  })
}
