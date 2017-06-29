import React from 'react'
import { AppRegistry, StatusBar } from 'react-native'
import { Container, Content, Button, Text } from 'native-base'
import { StackNavigator } from 'react-navigation'
import { Col, Row, Grid } from 'react-native-easy-grid'
import * as Animatable from 'react-native-animatable';

import { Register } from './components/Register'

class HomeScreen extends React.Component {
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
                  <Button block onPress={() => navigate('Register')} title="Lets Register">
                    <Text>Register2</Text>
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
