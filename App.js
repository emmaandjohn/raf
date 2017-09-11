import React from 'react'
import { Alert, AppRegistry, AsyncStorage, StatusBar } from 'react-native'
import { Container, Content, Button, Text } from 'native-base'
import { StackNavigator } from 'react-navigation'
import { Col, Row, Grid } from 'react-native-easy-grid'
import * as Animatable from 'react-native-animatable'

import * as firebase from 'firebase'
import R from 'ramda'
import * as keys from './firebase-secret'

import { Register } from './components/Register'

const loadFirebaseOnce = R.once(() => {
  const config = {
    apiKey: keys.apiKey,
    authDomain: keys.authDomain,
    databaseURL: keys.databaseURL,
    storageBucket: keys.storageBucket,
  }

  firebase.initializeApp(config)
  const database = firebase.database()
})

class HomeScreen extends React.Component {
  constructor(props){
    super(props)
    loadFirebaseOnce()
  }

  async setFirebase(){
    // Set user profile data
    const timestamp = new Date().getTime().toString()
    const randomNumber = (Math.round(Math.random() * (100000 - 1)) + 1).toString()

    const userid = timestamp+randomNumber
    const username = 'pascy'
    const email = 'paschcua@hhhhh.com'

    // Store Firebase data
    firebase.database().ref('users/'+userid).set({
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

  async getData(cb) {
    try {
      const ls_userid = await AsyncStorage.getItem('ls_userid')
      if (ls_userid !== null){
        firebase.database().ref('users/'+ls_userid).on('value', snap => cb(snap.val().email))
      }
    } catch (error) {
      Alert.alert(JSON.stringify(error))
    }
  }

  async updateData() {
    const ls_userid = await AsyncStorage.getItem('ls_userid')
    const ls_username = 'new pascy!'
    const ls_email = 'paschcua@hhhhh.ababababa'

    // Update Firebase Data
    try {
      let getUserdata = firebase.database().ref('users/'+ls_userid);
      getUserdata.update({ username: 'Ada', email: 'ppp@ppp.ch' });
    } catch (error) {
      Alert.alert(error)
    }
    // Update Localstorage Data
    try {
      await AsyncStorage.setItem('ls_username', ls_username)
      await AsyncStorage.setItem('ls_email', ls_email)
    } catch (error) {
      Alert.alert(error)
    }
  }

  render() {
    const { navigate } = this.props.navigation
        return (
          <Container>
            <StatusBar hidden={true} />
            <Content>
              <Grid>
                <Col>
                  <Button block light onPress={() => navigate('Register')} title="Lets Register">
                    <Animatable.Text animation="fadeIn" iterationCount='infinite'>Register</Animatable.Text>
                  </Button>
                </Col>
                <Col>
                  <Button block onPress={() => this.setFirebase()} title="setFirebase">
                    <Text>setFirebase</Text>
                  </Button>
                </Col>
                <Col>
                  <Button block onPress={() => this.getData((val) => Alert.alert(JSON.stringify(val)) )} title="getFirebase">
                    <Text>getFirebase</Text>
                  </Button>
                </Col>
              </Grid>
              <Grid>
                <Col>
                  <Button block onPress={() => this.updateData()} title="updateFirebase">
                    <Text>updateFirebase</Text>
                  </Button>
                </Col>
              </Grid>
            </Content>
          </Container>
        )
  }
}

const ReactNavigator = StackNavigator({
  Home: { screen: HomeScreen },
  Register: { screen: Register }
}, { headerMode: 'none' }
)

AppRegistry.registerComponent('RichAndFame', () => ReactNavigator)
