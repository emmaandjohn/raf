import React from 'react'
import { AppRegistry, Alert, AsyncStorage, Animated, Easing, Image, ImageBackground, StatusBar, StyleSheet, TouchableWithoutFeedback, View } from 'react-native'
import { Container, Content, Button, Text } from 'native-base'
import { StackNavigator } from 'react-navigation'
import I18n from 'react-native-i18n'
// import { Row, Grid } from 'react-native-easy-grid'
import { default as Sound } from 'react-native-sound'
// import * as Animatable from 'react-native-animatable'

import { checkNetworkConnection } from './components/_NetworkConnection'
import { StartScreen } from './components/Start'
import { RegisterScreen } from './components/Register'
import { AnimateWrapperImage } from './components/AnimateWrapperImage'

/* Preload sound assets */
const sndBtn = new Sound(require('./assets/snd/btn.mp3'))

export class HomeScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isInitialStart: false,
      isLoading: true,
      startAnimationLoop: false
    }
    Sound.setCategory('Playback')
    I18n.fallbacks = true
  }
  async setLocalization (t) {
    try {
      await AsyncStorage.setItem('ls_localization', t)
    } catch (error) {
      Alert.alert('Something went wrong while updating Localization-Settings')
    }
  }

  playSndAndRedirect (sndFile, loop, navigate, navPath) {
    loop ? sndFile.setNumberOfLoops(-1).play() : sndFile.play()
    navigate && navPath ? navigate(navPath) : null
  }

  componentWillMount () {
    checkNetworkConnection()
    AsyncStorage.getItem('ls_localization').then((localization) => {
      if (localization !== null) {
        this.setState({
          isInitialStart: false,
          isLoading: false
        })
      } else {
        this.setState({
          isInitialStart: true,
          isLoading: false
        })
      }
    })
  }

  componentDidMount () {
    const sndTheme = new Sound(require('./assets/snd/setuniman.mp3'), (error) => {
      if (error) { /*console.warn('failed to load the sound', error)*/ }
      // console.warn('duration in seconds: ' + sndTheme.getDuration() + 'number of channels: ' + sndTheme.getNumberOfChannels())
      this.playSndAndRedirect(sndTheme, 1, false, false)
    })
  }

  render () {
    const { navigate } = this.props.navigation
    const { isLoading, isInitialStart, startAnimationLoop } = this.state

    // Wait until AsyncStorage loaded
    if (isLoading) {
      return (
        <Container style={styles.wrapper}>
          <StatusBar hidden />
        </Container>
      )
    }

    // Auto localization
    // this.setLocalization('de') // Overwrite localization only via settings

    // 1. isInitialStart === true: First start of the App: Show Initial Screen
    // 2. isInitialStart === false: Navigate directly to gamescreen (User is already registered)
    return (
      <Container>
      <AnimateWrapperImage
        style={styles.blackOverlay}
        source={require('./assets/bg-black.jpg')}
        animation={'fadeOut'}
        duration={3000}
        delay={1000}
      />
      <ImageBackground source={require('./assets/start-bg.jpg')} style={styles.backgroundImage} imageStyle={styles.backgroundImage2}>
        <TouchableWithoutFeedback onPress={() => this.playSndAndRedirect(sndBtn, false, navigate, 'Start')}>
          <Container style={styles.container}>
            <StatusBar hidden />
          </Container>
        </TouchableWithoutFeedback>
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
const StyleAbsoluteAndContainImage = {
  position: 'absolute',
  resizeMode: 'contain'
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
  },
  blackOverlay: {
    top: 0, bottom: 0, left: 0, right: 0, position: 'absolute', zIndex: 3, resizeMode: 'stretch'
  },

  titleWrapper: { flex: 1, width: 600, alignSelf: 'center', marginBottom: 300 },
  title: {
    paddingTop: 100,
    resizeMode: 'contain',
    ...StyleFlexAndWidth
  },
  stein: {
    zIndex: 2,
    top: 120,
    left: -80,
    width: 328,
    height: 291,
    ...StyleAbsoluteAndContainImage
  },
  schere: {
    zIndex: 1,
    top: 80,
    left: 120,
    height: 215,
    width: 172,
    ...StyleAbsoluteAndContainImage
  },
  papier: {
    zIndex: 2,
    top: 80,
    left: 230,
    height: 285,
    width: 199,
    ...StyleAbsoluteAndContainImage
  },
  echse: {
    zIndex: 1,
    top: 90,
    left: 370,
    height: 282,
    width: 245,
    ...StyleAbsoluteAndContainImage
  },
  spock: {
    zIndex: 2,
    top: 150,
    left: 440,
    height: 300,
    width: 312,
    ...StyleAbsoluteAndContainImage
  },

  row: {
    marginTop: 10
  },
  rowTop: {
    marginTop: 35
  },
  btnFullWidth: {
    flex: 1
  }
})

const ReactNavigator = StackNavigator({
  Home: { screen: HomeScreen },
  Start: { screen: StartScreen },
  Register: { screen: RegisterScreen }
}, {
  headerMode: 'none',
  transitionConfig: () => ({
    transitionSpec: {
      duration: 0,
      timing: Animated.timing,
      easing: Easing.step0
    }
  })
}
)

AppRegistry.registerComponent('SSPES', () => ReactNavigator)
