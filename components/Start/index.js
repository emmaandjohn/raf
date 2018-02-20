import React from 'react'
import { translations as t } from '../_Localization'

import { AsyncStorage, ImageBackground, StyleSheet } from 'react-native'
import { Container, Content, Button } from 'native-base'
import { Col, Grid } from 'react-native-easy-grid'
import * as Animatable from 'react-native-animatable'

import { setData } from '../_Firebase/Set'

export class StartScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoaded: false
    }
  }

  componentWillMount () {
    AsyncStorage.getItem('ls_localization').then((localization) => {
      t.setLanguage(localization)
      AsyncStorage.getItem('ls_userid').then((localStorageUserid) => {
        if (localStorageUserid === null) {
          // No userId in localStorage present, therefore register a new user
          const timestamp = new Date().getTime().toString()
          const randomNumber = (Math.round(Math.random() * (100000 - 1)) + 1).toString()

          const userid = timestamp + randomNumber
          const username = 'paschcua'
          const email = 'paschcua@hispeed.ch'

          const firebaseStartingPath = 'users/'
          const firebaseParentPath = userid
          const firebaseUserDataObject = {
            username: username,
            email: email,
            language: localization
          }

          // Push the initial user-data Object to firebase (e.g. 'users/' + '12345687' + '{username: eaj, email: eaj@eaj.com}')
          setData(firebaseStartingPath, firebaseParentPath, firebaseUserDataObject)
        }
      })

      // As soon ls_localization is loaded, show the start screen with the choosen language
      this.setState({
        isLoaded: true
      })
    })
  }

  render () {
    const { navigate } = this.props.navigation
    const { isLoaded } = this.state

    return (
      <ImageBackground source={require('../../assets/screen-start-bg.jpg')} style={styles.backgroundImage} imageStyle={styles.backgroundImage2}>
        <Container style={styles.container}>
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
      </ImageBackground>
    )
  }
}

const StyleFlexAndWidth = {
  flex: 1,
  width: null,
  height: null
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    ...StyleFlexAndWidth
  },
  backgroundImage: {
    ...StyleFlexAndWidth
  },
  backgroundImage2: {
    resizeMode: 'cover'
  }
})
