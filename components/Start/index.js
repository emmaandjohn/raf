import React from 'react'
import { translations as t } from '../_Localization'

import { AsyncStorage } from 'react-native'
import { Container, Content, Button } from 'native-base'
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
})

export class StartScreen extends React.Component {
  constructor (props) {
    super(props)

    loadFirebaseOnce()
    this.state = {
      isLoaded: false
    }
  }

  componentWillMount () {
    AsyncStorage.getItem('ls_localization').then((localization) => {
      localization === 'de' ? t.setLanguage('de') : t.setLanguage('en')
      this.setState({
        isLoaded: true
      })
    })
  }

  render () {
    const { navigate } = this.props.navigation
    const { isLoaded } = this.state
    // () => this.getData((val) => Alert.alert(JSON.stringify(val)))

    return (
      <Container>
        { isLoaded
          ? <Content>
            <Grid>
              <Col>
                <Button block light onPress={() => navigate('Register')} title='Lets Register'>
                  <Animatable.Text animation='fadeIn' iterationCount='infinite'>{t.welcome}</Animatable.Text>
                </Button>
              </Col>
            </Grid>
          </Content>
          : null }
      </Container>
    )
  }
}

/*
const styles = StyleSheet.create({
  backgroundImage: {
    opacity: 1,
    flex: 1,
    width: null,
    height: null,
    paddingTop: 50
  }
})
*/
