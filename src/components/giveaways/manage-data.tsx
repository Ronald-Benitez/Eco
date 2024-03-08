import { View, Text, TextInput, Pressable } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import React, { useState } from 'react'

import useStyles from '@/src/hooks/useStyle'
import Button from '../ui/button'

export interface ManageDataProps {
    placeholder: string,
    handleAdd: (arr: string, value: string) => void,
    arr: string
}

const ManageData = ({ placeholder, handleAdd, arr }: ManageDataProps) => {
    const { styles } = useStyles()
    const [value, setValue] = useState('')

    const onAdd = () => {
        if (value) {
            handleAdd(arr, value)
            setValue('')
        }
    }

    return (
        <View style={styles.row}>
            <TextInput value={value} style={[styles.input, { minWidth: 300 }]} placeholder={placeholder} onChangeText={setValue} />
            <Button onPress={onAdd}>
                <Ionicons name="add" size={26} color="black" onPress={onAdd} />
            </Button>
        </View>
    )
}

export default ManageData