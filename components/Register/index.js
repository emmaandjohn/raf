import React from 'react'
import { Container, Content, Button, Text } from 'native-base'

export class RegisterScreen extends React.Component {
  render () {
    const { navigate } = this.props.navigation
    return (
      <Container>
        <Content>
          <Button block light onPress={() => navigate('Home')} title='Lets go Home'>
            <Text>Home test new</Text>
          </Button>
          <Button block light onPress={() => navigate('Start')} title='Lets go Start'>
            <Text>Start test new</Text>
          </Button>
        </Content>
      </Container>
    )
  }
}
