import React from 'react'
import { config } from './config'
import { AppState, AppRegistry, Alert, AsyncStorage, Animated, Easing, ImageBackground, Platform, StatusBar, StyleSheet } from 'react-native'
import { Container, Button, Text } from 'native-base'
import { StackNavigator } from 'react-navigation'
import I18n from 'react-native-i18n'
// import { Row, Grid } from 'react-native-easy-grid'
import { default as Sound } from 'react-native-sound'
import * as Animatable from 'react-native-animatable'
import './components/Animations'

import { checkNetworkConnection } from './components/_NetworkConnection'
import { StartScreen } from './components/Start'
import { RegisterScreen } from './components/Register'
import { AnimateWrapperImage } from './components/AnimateWrapperImage'

export class HomeScreen extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      appState: AppState.currentState,
      isInitialStart: false,
      isLoading: true,
      startAnimationLoop: false,
      isLoaded: false
    }
    I18n.fallbacks = true
    Sound.setCategory('Playback')
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
    this.setState({
      isLoaded: true
    })
  }

  componentDidMount () {
    if (Platform.OS === 'ios') {
      const sndTheme = new Sound(require('./assets/snd/setuniman.mp3'), (error) => {
        this.playSndAndRedirect(sndTheme, 1, false, false)
      })
    } else {
      AppState.addEventListener('change', this._handleAppStateChange)
    }
  }

  componentWillUnmount () {
    // AppState.removeEventListener('change', this._handleAppStateChange)
  }

  _handleAppStateChange = (currentAppState) => {
    if (currentAppState == 'background' || currentAppState == 'inactive') {
      this.state.sndTheme.release() // Pause sound on appLeave/exit
    }
    else if (currentAppState == 'active') {
      this.setState({ sndTheme: new Sound(require('./assets/snd/setuniman.mp3'), (error) => {
        this.playSndAndRedirect(this.state.sndTheme, 1, false, false)
      })})
    }
  }

  render () {
    const { navigate } = this.props.navigation
    const { isLoaded, isLoading, isInitialStart, startAnimationLoop } = this.state

    // Wait until AsyncStorage loaded
    if (isLoading) {
      return (
        <Container style={styles.wrapper}>
          <StatusBar hidden />
        </Container>
      )
    }

    // Load Snd Btn
    const sndBtn = new Sound(require('./assets/snd/btn.mp3'))

    // Auto localization
    // this.setLocalization('de') // Overwrite localization only via settings

    // 1. isInitialStart === true: First start of the App: Show Initial Screen
    // 2. isInitialStart === false: Navigate directly to gamescreen (User is already registered)
    return (
      <Container>
        <StatusBar hidden />
        <ImageBackground source={require('./assets/start-bg.jpg')} style={styles.backgroundImage} imageStyle={styles.backgroundImage2}>
          { isInitialStart
            ? <Container style={styles.container}>
              <Button style={styles.btnStart} large dark onPress={() => this.playSndAndRedirect(sndBtn, false, navigate, 'Start')}>
                <Animatable.Text style={styles.btnText} animation='fadeHalf' easing='ease' duration={2000} iterationCount='infinite'>{I18n.t('welcomeStartBtn')}</Animatable.Text>
              </Button>
            </Container>
          : console.warn('NOT INITIAL START') }
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
/* const StyleAbsoluteAndContainImage = {
  position: 'absolute',
  resizeMode: 'contain'
} */

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    ...StyleFlexAndWidth
  },
  backgroundImage: {
    ...StyleFlexAndWidth
  },
  backgroundImage2: {
    resizeMode: 'cover'
  },
  blackOverlay: {
    top: 0, bottom: 0, left: 0, right: 0, position: 'absolute', zIndex: 99, resizeMode: 'stretch'
  },

  titleWrapper: { flex: 1, width: 600, alignSelf: 'center', marginBottom: 300 },
  title: {
    paddingTop: 100,
    resizeMode: 'contain',
    ...StyleFlexAndWidth
  },
  btnStart: {
    alignSelf: 'center',
    top: 100,
    paddingLeft: 100,
    paddingRight: 100,
    paddingTop: 10,
    paddingBottom: 10,
    borderWidth: 1,
    borderColor: '#F9AA23',
    opacity: 0.9,
    zIndex: 1
  },
  btnText: {
    fontFamily: config.fonts.patua,
    color: '#F9AA23',
    fontSize: 22
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
