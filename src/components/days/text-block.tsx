import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'

import useStyles from '@/src/hooks/useStyle'
import Button from '@/src/components/ui/button'

interface TextBlockProps {
  text: string
  onChangeText: (text: string) => void
  title: string
}

const TextBlock: React.FC<TextBlockProps> = ({ onChangeText, text, title }) => {
  const { colors, styles } = useStyles()
  const [editable, setEditable] = useState(false)

  const toggleEditable = () => {
    setEditable(!editable)
  }

  return (
    <View style={[styles.flexContainer, { gap: 20 }]}>
      <View style={[styles.row, { justifyContent: "center" }]} >
        <Text style={[styles.textColor, { minWidth: 200 }]}>{title}</Text>
      </View>
      <View style={[styles.row]} >
        {
          editable ? (
            <TextInput
              style={[styles.input, { minWidth: "100%" }]}
              value={text}
              onChangeText={onChangeText}
              onBlur={toggleEditable}
              autoFocus
              multiline
              placeholder={title}
            />
          ) : (
            <View style={[styles.row]} >
              <Pressable
                style={[styles.input, styles.centerer, { minWidth: "100%", minHeight: 200 }]}
                onPress={toggleEditable}
              >
                <Text style={[styles.text]}>{text}</Text>
              </Pressable>
            </View>
          )
        }
      </View>
    </View>
  )
}

const styles2 = StyleSheet.create({
  textBlock: {
    minWidth: "100%",
    minHeight: 200,
    padding: 6,
    backgroundColor: "white",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#a0a3a1",
    color: "black",
  }
})

export default TextBlock