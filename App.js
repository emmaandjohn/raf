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
      <Container style={styles.wrapper}>
        <StatusBar hidden />
        <Content>

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
