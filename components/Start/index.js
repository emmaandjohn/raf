import React from 'react'
import { config } from '../../config'
import { translations as t } from '../_Localization'
import I18n from 'react-native-i18n'

import { AsyncStorage, ImageBackground, StyleSheet, StatusBar } from 'react-native'
import { Container, Content, Text } from 'native-base'
import { Row, Grid } from 'react-native-easy-grid'
import * as Animatable from 'react-native-animatable'

import TitleTop from '../TitleTop'
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
      // t.setLanguage(localization)
      AsyncStorage.getItem('ls_userid').then((localStorageUserid) => {
        if (localStorageUserid === null) {
          // No userId in localStorage present, therefore register a new user
          const timestamp = new Date().getTime().toString()
          const randomNumber = (Math.round(Math.random() * (100000 - 1)) + 1).toString()

          const userid = timestamp + randomNumber
          const username = ''
          const email = ''

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
      <Container>
        <StatusBar hidden />
        <ImageBackground source={require('../../assets/screen-start-bg.jpg')} style={styles.backgroundImage} imageStyle={styles.backgroundImageResizeMode}>
          <Container style={styles.container}>
            <Grid>
              <Row>
                <TitleTop titleText={I18n.t('Title_Choose_Favorite')} />
              </Row>
            </Grid>
          </Container>
        </ImageBackground>
      </Container>
    )
  }
}

const StyleFlexAndWidth = {
  flex: 1,
  width: null,
  height: null
}

const styles = StyleSheet.create({
  backgroundImage: {
    ...StyleFlexAndWidth
  },
  backgroundImageResizeMode: {
    resizeMode: 'cover'
  },
  titleStyle1: {
    fontFamily: config.fonts.patua,
    color: '#F9AA23',
    fontSize: 22,
    textAlign: 'center',
    padding: 15,
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'stretch',
    height: 63
  }
})
