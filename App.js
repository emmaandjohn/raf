import React from 'react'
import { AppRegistry, Alert, AsyncStorage, Animated, Easing, StatusBar, StyleSheet } from 'react-native'
import { Container, Content, Button, Text } from 'native-base'
import { StackNavigator } from 'react-navigation'
import { Row, Grid } from 'react-native-easy-grid'

import { StartScreen } from './components/Start'
import { RegisterScreen } from './components/Register'

export class HomeScreen extends React.Component {
  async setLocalization (t) {
    try {
      await AsyncStorage.setItem('ls_localization', t)
    } catch (error) {
      Alert.alert(error)
    }
  }

  render () {
    const { navigate } = this.props.navigation
    return (
      <Container>
        <StatusBar hidden />
        <Content>

          <Grid>
            <Row style={styles.title}>
              <Text>Schere, Stein, Papier, Echse, Spok</Text>
            </Row>
          </Grid>

          <Grid>
            <Row style={styles.row}>
              <Button block light onPress={() => this.setLocalization('de') && navigate('Start')}>
                <Text>Deutsch</Text>
              </Button>
            </Row>
          </Grid>

          <Grid>
            <Row style={styles.row}>
              <Button block light onPress={() => this.setLocalization('en') && navigate('Start')}>
                <Text>English</Text>
              </Button>
            </Row>
          </Grid>

        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  title: {
    flex: 1,
    backgroundColor: 'rgba(130,97,108,1)',
    paddingTop: 50,
    height: 200,
    borderWidth: 1,
    borderColor: '#000000'
  },
  row: {
    flex: 1,
    backgroundColor: 'rgba(130,97,108,1)',
    paddingTop: 50
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

AppRegistry.registerComponent('RichAndFame', () => ReactNavigator)
