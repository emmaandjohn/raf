async updateData () {
  const localStorageUserid = await AsyncStorage.getItem('ls_userid')
  const localStorageUsername = 'new pascy!'
  const localStorageEmail = 'paschcua@hhhhh.ababababa'

  // Update Firebase Data
  try {
    let getUserdata = firebase.database().ref('users/' + localStorageUserid)
    getUserdata.update({ username: 'Ada', email: 'ppp@ppp.ch' })
  } catch (error) {
    Alert.alert(error)
  }
  // Update Localstorage Data
  try {
    await AsyncStorage.setItem('ls_username', localStorageUsername)
    await AsyncStorage.setItem('ls_email', localStorageEmail)
  } catch (error) {
    Alert.alert(error)
  }
}
