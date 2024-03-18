import { View, Text, TouchableOpacity, ScrollView, ViewStyle } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useTranslation } from 'react-i18next'

import useStyles from '@/src/hooks/useStyle'
import BaseModal from '@/src/components/ui/base-modal'
import Button from '@/src/components/ui/button'

interface PickerProps {
    value: string
    moods: string[]
    onChange: (value: string, index: number) => void
}

const MoodPicker: React.FC<PickerProps> = ({ onChange, moods, value }) => {
    const { colors, styles } = useStyles()
    const { CustomModal, showModal, hideModal } = BaseModal(true)
    const [selectedMoods, setSelectedMoods] = useState<string[]>([])
    const { t } = useTranslation()

    const mappedMoods = moods.map((mood) => t(`colors.${mood}`))

    useEffect(() => {
        setSelectedMoods(getCleanMoods())
    }, [value])

    const getCleanMoods = () => {
        const cleanMoods = value.split(" ").filter((mood) => mood !== "")
        return cleanMoods
    }

    const PickerButton = (
        <Button onPress={showModal} >
            <Ionicons name="caret-down" size={24} color="black" />
            <Text>{t("days.moods")}</Text>
        </Button>
    )

    const handlePress = (option: string, index: number) => {
        onChange(option, index)
        hideModal()
    }

    const isSelected = (index: number) => {
        return selectedMoods.find((mood) => mood === index.toString())
    }

    const getStyle = (index: number) => {
        // @ts-ignore
        const color = colors.days[moods[index]]
        const style: ViewStyle = {
            borderColor: color,
            borderLeftWidth: 4,
        }
        return style
    }

    const getColor = (index: number) => {
        // @ts-ignore
        return colors.days[moods[index]]
    }

    return (
        <>
            <CustomModal button={PickerButton} title={t("day.moods")} maxHeight={500}>
                <ScrollView >
                    <View style={[styles.col, { gap: 4, minWidth: "80%", minHeight: "100%" }]}>
                        {
                            mappedMoods.map((option, index) => (
                                <TouchableOpacity key={index} style={[styles.button, getStyle(index)]} onPress={() => handlePress(option, index)}>
                                    <Text style={styles.middleText}>{option}</Text>
                                    {
                                        isSelected(index) && <Ionicons name="checkmark" size={24} color={getColor(index)} />
                                    }
                                </TouchableOpacity>
                            ))
                        }
                    </View>
                </ScrollView>
            </CustomModal>
        </>
    )
}

export default MoodPicker