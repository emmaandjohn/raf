import React from 'react'
import { Alert } from 'react-native'
import { Container, Content, Button, Text } from 'native-base'

import { getData } from '../_Firebase/Get'
import { setData } from '../_Firebase/Set'
import { updateData } from '../_Firebase/Update'

export class RegisterScreen extends React.Component {
  render () {
    const { navigate } = this.props.navigation
    return (
      <Container>
        <Content>
          <Button block light onPress={() => navigate('Home')}>
            <Text>Home test new</Text>
          </Button>
          <Button block light onPress={() => navigate('Start')}>
            <Text>Start test new</Text>
          </Button>
          <Button block light onPress={() => getData((val) => Alert.alert(JSON.stringify(val)))}>
            <Text>getData</Text>
          </Button>
          <Button block light onPress={() => setData()}>
            <Text>setData</Text>
          </Button>
          <Button block light onPress={() => updateData('John new username', 'john@mclain.com')}>
            <Text>updateData</Text>
          </Button>
        </Content>
      </Container>
    )
  }
}
