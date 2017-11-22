import React from 'react'
import { Image } from 'react-native'
import * as Animatable from 'react-native-animatable'

export class AnimateWrapperImage extends React.Component {
  render () {
    return (
      <Animatable.Image
        style={this.props.style}
        source={this.props.source}
        animation={this.props.animation}
        iterationCount={this.props.iterationCount ? this.props.iterationCount : 1}
        easing={this.props.easing ? this.props.easing : 'ease-out'}
        delay={this.props.delay ? this.props.delay : 600}
        duration={this.props.duration ? this.props.duration : 1000}
        useNativeDriver={this.props.useNativeDriver ? this.props.useNativeDriver : true}
        onAnimationEnd={this.props.onAnimationEnd ? this.props.onAnimationEnd : null}
      />
    )
  }
}
