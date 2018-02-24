import * as Animatable from 'react-native-animatable'

/* Define custom animations */

/* FadeHalf 50% */
Animatable.initializeRegistryWithDefinitions({
  fadeHalf: {
    from: {
      opacity: 0.5
    },
    to: {
      opacity: 1
    }
  }
})
