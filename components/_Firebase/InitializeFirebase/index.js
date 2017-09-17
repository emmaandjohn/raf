import R from 'ramda'
import * as firebase from 'firebase'
import * as keys from '../../../firebase-secret'

export const loadFirebaseOnce = R.once(() => {
  const config = {
    apiKey: keys.apiKey,
    authDomain: keys.authDomain,
    databaseURL: keys.databaseURL,
    storageBucket: keys.storageBucket
  }

  firebase.initializeApp(config)
})
