async setFirebase () {
  // Set user profile data
  const timestamp = new Date().getTime().toString()
  const randomNumber = (Math.round(Math.random() * (100000 - 1)) + 1).toString()

  const userid = timestamp + randomNumber
  const username = 'pascy'
  const email = 'paschcua@hhhhh.com'

  // Store Firebase data
  firebase.database().ref('users/' + userid).set({
    userid: userid,
    username: username,
    email: email
  })
  // Store Localstorage persistent data
  try {
    await AsyncStorage.setItem('ls_userid', userid)
    await AsyncStorage.setItem('ls_username', username)
    await AsyncStorage.setItem('ls_email', email)
  } catch (error) {
    Alert.alert(error)
  }
}
