import { View, Text, Pressable } from 'react-native'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { LinearGradient } from 'expo-linear-gradient'

import useStyles from '@/src/hooks/useStyle'
import moods from "@/src/files/moods.json"

interface MoodDisplayProps {
    mood: string
    horizontal?: boolean
}


const MoodDisplay: React.FC<MoodDisplayProps> = ({ mood, horizontal = true }) => {
    const { styles, colors } = useStyles()
    const { t } = useTranslation()
    const [moodsSelected, setMoodsSelected] = React.useState<string[]>([])

    useEffect(() => {
        splitClean()
    }, [mood])

    const splitClean = () => {
        const splitMoods = mood.split(" ")
        const cleanMoods = splitMoods.filter((mood) => mood !== "")
        setMoodsSelected(cleanMoods)
    }

    const getGradient = () => {
        const gradient = moodsSelected.sort().map((mood) => {
            // @ts-ignore
            return colors.days[moods[parseInt(mood)]]
        })
        if (gradient.length === 0) return ["#fff", "#fff"]
        if (gradient.length === 1) return [gradient[0], gradient[0]]
        return gradient
    }

    const start = horizontal ? { x: 0, y: 0 } : { x: 0, y: 0 }
    const end = horizontal ? { x: 1, y: 0 } : { x: 0, y: 1 }

    return (
        <LinearGradient colors={getGradient()} style={horizontal ? styles.moodViewHorizontal : styles.moodViewVertical} start={start} end={end} />
    )
}

export default MoodDisplay

