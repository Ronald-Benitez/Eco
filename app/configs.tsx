import { View, Text, Pressable } from 'react-native'
import React, { useState } from 'react'

import ColorPicker from '@/src/components/ui/color-picker'


const configs = () => {
  const [color, setColor] = useState("#000000")

  return (
    <View>
      <Text>configs</Text>
      <ColorPicker color={color} onColorChange={setColor} baseWith={350} />
    </View>
  )
}

export default configs