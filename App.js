import React from 'react'
import { Alert, AppRegistry, StatusBar } from 'react-native'
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

  setFirebase(){
    const timestamp = new Date().getTime()
    firebase.database().ref('users/'+timestamp).set({
      username: 'Pascal',
      timestamp: timestamp,
      email: 'aaa@bbb.ch'
    })
  }

  getData(cb) {
    firebase.database().ref('users/').on('value', snap => cb(snap.val()))
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
                  <Button block onPress={() => this.getData((val) => Alert.alert(JSON.stringify(val)))} title="getFirebase">
                    <Text>getFirebase</Text>
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
