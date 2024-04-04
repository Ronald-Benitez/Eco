import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { useState, useEffect, ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

import { Day } from '@/src/interfaces/day'
import useStyles from '@/src/hooks/useStyle'
import useDb from '@/src/hooks/useDb'
import moods from "@/src/files/moods.json"
import useDate from '@/src/hooks/useDate'
import DatePicker from '@/src/components/ui/date-picker'


const Chart = () => {
    const dateH = useDate()
    const [date, setDate] = useState(dateH.create())
    const { t } = useTranslation()
    const { styles, colors } = useStyles()
    const { useDays } = useDb()
    const [days, setDays] = useState<Day[]>([])
    const [moodCount, setMoodCount] = useState<number[]>([])
    const [max, setMax] = useState<number>(0)

    useEffect(() => {
        const loadDays = async () => {
            const days = await useDays.getMonth(date)
            setDays(days)
        }
        loadDays()
    }, [date])

    const countMoods = () => {
        const count = moods.map(() => 0)
        days.forEach((day) => {
            day.difference.split(" ").filter(e => e != "").forEach((mood) => {
                count[parseInt(mood)]++
            })
        })
        setMoodCount(count)
        setMax(Math.max(...count))
    }

    useEffect(() => {
        countMoods()
    }, [days])

    const RenderCount = ({ index }: { index: number }) => {

        // @ts-ignore
        const color = colors.days[moods[index]]
        const size = moodCount[index] / max * 100
        return (
            <View style={[style2.bar, { height: `${size}%`, backgroundColor: color }]}></View>

        )
    }

    const RenderBlockColor = () => {


        const returnView: ReactNode[] = []

        moods.map((mood, index) => {
            if (moodCount[index] === 0) return null
            // @ts-ignore
            const color = colors.days[moods[index]]
            returnView.push(
                <View style={[styles.button, { borderColor: color, borderLeftWidth: 10, borderRightWidth: 5, justifyContent: "space-between" }]} key={index}>
                    <Text style={styles.middleText}>{t(`colors.${mood}`)}</Text>
                    <Text style={styles.middleText}>{moodCount[index]}</Text>
                </View>
            )
        })

        return (
            <View style={[styles.col, { marginTop: 10 }]}>
                {returnView}
            </View>
        )
    }


    return (
        <View style={styles.container}>
            <Text style={styles.title}>{dateH.getStringMonthAndYear(date)}</Text>
            <View style={style2.barContainer}>
                {
                    moodCount.map((count, index) => {
                        if (count === 0) return null
                        return (
                            <RenderCount index={index} key={index} />
                        )
                    })
                }
            </View>
            <ScrollView >
                <RenderBlockColor />
            </ScrollView>
            <DatePicker
                value={date}
                onChange={setDate}
                buttonText={dateH.getStringMonthAndYear(date)}
            />
        </View>
    )
}

export default Chart

const style2 = StyleSheet.create({
    barContainer: {
        flexDirection: "row",
        alignItems: "flex-end",
        marginVertical: 5,
        gap: 5,
        height: 300,
        borderLeftWidth: 1,
        borderBottomWidth: 1,
        borderColor: "black",
        padding: 5,

    },
    bar: {
        width: 25,
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 10,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 0,
    },
})