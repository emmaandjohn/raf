import React from 'react'
import { ActivityIndicator, Alert, AsyncStorage, Image, StyleSheet } from 'react-native'
import { Container, Content, Button, Text } from 'native-base'
import { Col, Grid } from 'react-native-easy-grid'
import * as Animatable from 'react-native-animatable'

import * as firebase from 'firebase'
import R from 'ramda'
import * as keys from '../../firebase-secret'

const loadFirebaseOnce = R.once(() => {
  const config = {
    apiKey: keys.apiKey,
    authDomain: keys.authDomain,
    databaseURL: keys.databaseURL,
    storageBucket: keys.storageBucket
  }

  firebase.initializeApp(config)
  // const database = firebase.database()
})

export class StartScreen extends React.Component {
  constructor (props) {
    super(props)
    loadFirebaseOnce()
    this.state = {
      isImageLoading: true
    }
  }

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

  imageIsLoaded () {
    this.setState({isImageLoading: false})
    this.refs.imgFade.transitionTo({opacity: 1})
  }

  render () {
    const { navigate } = this.props.navigation
    const { isImageLoading } = this.state

    return (
      <Container style={isImageLoading ? styles.bgBlack : styles.wrapContainer}>
        <Animatable.Image
          resizeMode='cover'
          ref='imgFade'
          onLoad={() => this.imageIsLoaded()}
          source={require('../../assets/bg2.jpg')}
          backgroundColor={'black'}
          style={styles.backgroundImage}
        >
          <Content>
            <Grid>
              <Col>
                <Button block light onPress={() => navigate('Register')} title='Lets Register'>
                  <Animatable.Text animation='fadeIn' iterationCount='infinite'>Register</Animatable.Text>
                </Button>
              </Col>
            </Grid>

            <Grid>
              <Col>
                <Button block onPress={() => this.setFirebase()} title='setFirebase'>
                  <Text>setFirebase</Text>
                </Button>
              </Col>
            </Grid>

            <Grid>
              <Col>
                <Button block onPress={() => this.getData((val) => Alert.alert(JSON.stringify(val)))} title='getFirebase'>
                  <Text>getFirebase</Text>
                </Button>
              </Col>
            </Grid>

            <Grid>
              <Col>
                <Button block onPress={() => this.updateData()} title='updateFirebase'>
                  <Text>updateFirebase</Text>
                </Button>
              </Col>
            </Grid>

            <Grid>{ isImageLoading ? <ActivityIndicator /> : null }</Grid>
          </Content>
        </Animatable.Image>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  wrapContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0)'
  },
  bgBlack: {
    flex: 1,
    backgroundColor: 'rgba(130,97,108,1)'
  },
  backgroundImage: {
    opacity: 0,
    flex: 1,
    width: null,
    height: null,
    paddingTop: 50
  }
})
