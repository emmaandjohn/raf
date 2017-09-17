import { Alert, AsyncStorage } from 'react-native'
import { checkNetworkConnection } from '../../_NetworkConnection'
import { loadFirebaseOnce } from '../InitializeFirebase'

import * as firebase from 'firebase'

export function setData () {
  checkNetworkConnection()
  loadFirebaseOnce()

  // Set user profile data
  const timestamp = new Date().getTime().toString()
  const randomNumber = (Math.round(Math.random() * (100000 - 1)) + 1).toString()

  const userid = timestamp + randomNumber
  const username = 'sample name'
  const email = 'sample@sample.com'

  // Store Firebase data
  firebase.database().ref('users/' + userid).set({
    userid: userid,
    username: username,
    email: email
  })

  // Local Storage for persistent data
  try {
    AsyncStorage.setItem('ls_userid', userid)
    AsyncStorage.setItem('ls_username', username)
    AsyncStorage.setItem('ls_email', email)
  } catch (error) {
    Alert.alert(error)
  }
}
