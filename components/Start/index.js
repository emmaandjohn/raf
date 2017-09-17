import React from 'react'
import { translations as t } from '../_Localization'

import { AsyncStorage } from 'react-native'
import { Container, Content, Button } from 'native-base'
import { Col, Grid } from 'react-native-easy-grid'
import * as Animatable from 'react-native-animatable'

export class StartScreen extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      isLoaded: false
    }
  }

  componentWillMount () {
    AsyncStorage.getItem('ls_localization').then((localization) => {
      localization === 'de' ? t.setLanguage('de') : t.setLanguage('en')
      this.setState({
        isLoaded: true
      })
    })
  }

  render () {
    const { navigate } = this.props.navigation
    const { isLoaded } = this.state
    // () => this.getData((val) => Alert.alert(JSON.stringify(val)))

    return (
      <Container>
        { isLoaded
          ? <Content>
            <Grid>
              <Col>
                <Button block light onPress={() => navigate('Register')} title='Lets Register'>
                  <Animatable.Text animation='fadeIn' iterationCount='infinite'>{t.welcome}</Animatable.Text>
                </Button>
              </Col>
            </Grid>
          </Content>
          : null }
      </Container>
    )
  }
}

/*
const styles = StyleSheet.create({
  backgroundImage: {
    opacity: 1,
    flex: 1,
    width: null,
    height: null,
    paddingTop: 50
  }
})
*/
