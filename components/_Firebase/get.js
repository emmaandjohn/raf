async getData (cb) {
  try {
    const localStorageUserid = await AsyncStorage.getItem('ls_userid')
    if (localStorageUserid !== null) {
      firebase.database().ref('users/' + localStorageUserid).on('value', snap => cb(snap.val().email))
    }
  } catch (error) {
    Alert.alert(error)
  }
}
