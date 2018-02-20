import { Alert, AsyncStorage } from 'react-native'
import { checkNetworkConnection } from '../../_NetworkConnection'
import { loadFirebaseOnce } from '../InitializeFirebase'

import * as firebase from 'firebase'

export function setData (firebaseStartingPath, firebaseParentPath, firebaseUserDataObject) {
  checkNetworkConnection()
  loadFirebaseOnce()

  if ((typeof firebaseUserDataObject === 'object') && (firebaseUserDataObject !== null)) {
    // 1. REGISTER NEW USER
    // Push the Object to Firebase (e.g. 'users/123456756' + '{username: eaj, email: eaj@eaj.com}')
    firebase.database().ref(firebaseStartingPath + firebaseParentPath).set({
      username: firebaseUserDataObject.username,
      email: firebaseUserDataObject.email,
      language: firebaseUserDataObject.language
    })

    // Local Storage for persistent data
    try {
      AsyncStorage.setItem('ls_userid', firebaseParentPath)
      AsyncStorage.setItem('ls_username', firebaseUserDataObject.username)
      AsyncStorage.setItem('ls_email', firebaseUserDataObject.email)
    } catch (error) {
      Alert.alert('Error: Something went wrong while trying to save a new local profile!')
    }
  } else {
    Alert.alert('Error: Something went wrong while trying to push to the database!')
  }
}
