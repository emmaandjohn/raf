import { StyleSheet, Text } from 'react-native'
import React from 'react'
import { config } from '../../config'

const TitleTop = ({ titleText }) => (
  <Text style={styles.titleStyle1}>{titleText}</Text>
)

const styles = StyleSheet.create({
  titleStyle1: {
    fontFamily: config.fonts.patua,
    color: '#F9AA23',
    fontSize: 22,
    textAlign: 'center',
    padding: 15,
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'stretch',
    height: 63
  }
})

export default TitleTop
