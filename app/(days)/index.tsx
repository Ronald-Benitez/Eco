import { View, Text, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import TextBlock from '@/src/components/days/text-block'
import useStyles from '@/src/hooks/useStyle'
import MoodDisplay from '@/src/components/days/mood-display'
import MoodPicker from '@/src/components/days/mood-picker'
import useDate from '@/src/hooks/useDate'
import Button from '@/src/components/ui/button'
import useDb from '@/src/hooks/useDb'
import DatePicker from '@/src/components/ui/date-picker'

const Index = () => {
    const { styles } = useStyles()
    const dateHelper = useDate()
    const [date, setDate] = useState(dateHelper.create())
    const [difference, setDifference] = useState<string>("")
    const [expected, setExpected] = useState<string>("")
    const [real, setReal] = useState<string>("")
    const { t } = useTranslation()
    const { useDays } = useDb()

    const onMoodChange = (index: number) => {
        let diff = difference
        const moods = difference.split(" ")
        if (moods.find((mood) => mood === index.toString())) {
            diff = difference.replace(`${index} `, "")
            return setDifference(diff)
        }
        diff += `${index} `
        setDifference(diff)
        useDays.updateField(date, diff, 'difference')
    }

    const onExpectedChange = (text: string) => {
        setExpected(text)
        useDays.updateField(date, text, 'expected')
    }

    const onRealChange = (text: string) => {
        setReal(text)
        useDays.updateField(date, text, 'real')
    }

    useEffect(() => {
        loadDay()
        // useDays.clean()
    }, [date])


    const loadDay = async () => {
        const res = await useDays.getDay(date)
        console.log(res)
        if (res) {
            setExpected(res.expected)
            setReal(res.real)
            setDifference(res.difference)

        } else {
            setExpected("")
            setReal("")
            setDifference("")
            useDays.insertDay({
                date,
                expected: "",
                real: "",
                difference: ""
            })
        }
    }


    return (
        <View style={styles.container}>
            <ScrollView style={styles.bgPrimary}>
                <View style={styles.container}>
                    <MoodDisplay
                        mood={difference}
                    />
                    <View style={styles.row}>
                        <Button onPress={() => setDate(dateHelper.create())}>
                            <Text style={styles.text}>{dateHelper.getStringDay(date)}</Text>
                        </Button>
                        <MoodPicker
                            value={difference}
                            onChange={onMoodChange}
                        />
                    </View>
                    <TextBlock
                        title={t("days.expected")}
                        text={expected}
                        onChangeText={onExpectedChange}
                    />
                    <TextBlock
                        title={t("days.real")}
                        text={real}
                        onChangeText={onRealChange}
                    />
                </View>
            </ScrollView>
            <DatePicker
                value={date}
                onChange={setDate}
                extras={true}
                buttonText={dateHelper.getStringDate(date)}
            />
        </View>
    )
}

export default Index