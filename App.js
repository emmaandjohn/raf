import React from 'react'
import { ActivityIndicator, AppRegistry, Animated, Easing, StatusBar } from 'react-native'
import { Container, Content, Button, Text } from 'native-base'
import { StackNavigator } from 'react-navigation'
// import { Col, Row, Grid } from 'react-native-easy-grid'

import { StartScreen } from './components/Start'
import { RegisterScreen } from './components/Register'

class HomeScreen extends React.Component {
  render () {
    const { navigate } = this.props.navigation
    return (
      <Container>
        <StatusBar hidden />
        <Content>
          <ActivityIndicator />
          <Button block light onPress={() => navigate('Start')} title='Lets go to Startscreen'>
            <Text>go to start screen</Text>
          </Button>
        </Content>
      </Container>
    )
  }
}

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

AppRegistry.registerComponent('RichAndFame', () => ReactNavigator)
