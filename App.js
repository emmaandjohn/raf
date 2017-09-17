import React from 'react'
import { AppRegistry, Alert, AsyncStorage, Animated, Easing, Image, StatusBar, StyleSheet } from 'react-native'
import { Container, Content, Button, Text } from 'native-base'
import { StackNavigator } from 'react-navigation'
import { Row, Grid } from 'react-native-easy-grid'

import { checkNetworkConnection } from './components/_NetworkConnection'
import { StartScreen } from './components/Start'
import { RegisterScreen } from './components/Register'

export class HomeScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isInitialStart: false,
      isLoading: true
    }
  }
  async setLocalization (t) {
    try {
      await AsyncStorage.setItem('ls_localization', t)
    } catch (error) {
      Alert.alert('Something went wrong while updating Localization-Settings')
    }
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

  render () {
    const { navigate } = this.props.navigation
    const { isLoading, isInitialStart } = this.state

    // Wait until AsyncStorage loaded
    if (isLoading) {
      return (
        <Container style={styles.wrapper}>
          <StatusBar hidden />
        </Container>
      )
    }

    // 1. isInitialStart === true: First start of the App: Show Initial Screen, choose language and register a new User
    // 2. isInitialStart === false: Navigate directly to gamescreen (User is already registered)
    return (
      <Container style={styles.wrapper}>
        <StatusBar hidden />
        { isInitialStart
          ? <Content>

            <Grid style={styles.title}>
              <Row>
                <Text style={styles.titleText}>Schere, Stein, Papier, Echse, Spock</Text>
              </Row>
            </Grid>

            <Grid>
              <Row style={styles.rowTop}>
                <Button style={styles.btnFullWidth} block light onPress={() => this.setLocalization('de') && navigate('Start')}>
                  <Text>Deutsch</Text>
                </Button>
              </Row>
              <Row style={styles.row}>
                <Button style={styles.btnFullWidth} block light onPress={() => this.setLocalization('en') && navigate('Start')}>
                  <Text>English</Text>
                </Button>
              </Row>
            </Grid>

          </Content>
        : navigate('Register') }
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 5
  },
  title: {
    flex: 1,
    paddingTop: 50,
    height: 200,
    borderWidth: 1,
    borderColor: '#000000'
  },
  titleText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold'
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
