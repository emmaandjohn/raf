import { Alert } from 'react-native'
import React from 'react'
import { StackNavigator } from 'react-navigation'

/**
  1. sndFile = passing a soundfile
  2. loop = "1" means loop the soundfile, "false" means dont loop
  3. navigate = If page should redirect or not. Yes = passing navigate-object, No = passing "false"
  4. navigatePath = The path to navigate (e.g. "Start"), for no navigation -> pass "null"
**/

export default ({ sndFile, loop, navigate, navigatePath }) => (
    loop ? sndFile.setNumberOfLoops(-1) : null
    navigate ? navigate('Start') : null
)
