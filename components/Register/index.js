import React from 'react'
import { AppRegistry } from 'react-native'
import { StackNavigator } from 'react-navigation'
import { Container, Content, Button, Text } from 'native-base';

export class Register extends React.Component {
  render() {
    const { navigate } = this.props.navigation
    return (
      <Container>
        <Content>
          <Button block light onPress={() => navigate('Home')} title="Lets go Home">
            <Text>Home test</Text>
          </Button>
        </Content>
      </Container>
    )
  }
}
