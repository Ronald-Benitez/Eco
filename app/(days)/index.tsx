import { View, Text, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

import TextBlock from '@/src/components/days/text-block'
import useStyles from '@/src/hooks/useStyle'
import MoodDisplay from '@/src/components/days/mood-display'
import DatePicker from '@/src/components/ui/date-picker'
import MoodPicker from '@/src/components/days/mood-picker'
import useDate from '@/src/hooks/useDate'

type day = {
    date: string
    expected: string
    real: string
    difference: string
}

const moods = [
    "unassigned",
    "neutral",
    "happy",
    "sad",
    "angry",
    "anxious",
    "tired",
    "excited",
    "relaxed",
    "stressed",
]
const Index = () => {
    const { styles } = useStyles()
    const [day, setDay] = useState<day>({
        date: new Date().toISOString(),
        expected: "",
        real: "",
        difference: ""
    })
    const { t } = useTranslation()
    const date = useDate()

    const handleAddMood = (value: string, index: number) => {
        let { difference } = day
        const moods = difference.split(" ")
        if (moods.find((mood) => mood === index.toString())) {
            difference = difference.replace(`${index} `, "")
            return setDay({ ...day, difference })
        }
        difference += `${index} `
        setDay({ ...day, difference })
    }

    return (
        <ScrollView style={styles.bgPrimary}>
            <View style={styles.container}>
                <MoodDisplay
                    moods={moods}
                    mood={day.difference}
                />
                <View style={styles.row}>
                    <DatePicker
                        value={day.date}
                        onChange={(date) => setDay({ ...day, date })}
                        buttonText={date.getDay(day.date)}
                    />
                    <MoodPicker
                        value={day.difference}
                        moods={moods}
                        onChange={handleAddMood}
                    />
                </View>
                <TextBlock
                    title={t("days.expected")}
                    text={day.expected}
                    onChangeText={(text) => setDay({ ...day, expected: text })}
                />
                <TextBlock
                    title={t("days.real")}
                    text={day.real}
                    onChangeText={(text) => setDay({ ...day, real: text })}
                />
            <Text style={styles.middleText}>{date.getDate(day.date)}</Text>
            </View>
        </ScrollView>
    )
}

export default Index