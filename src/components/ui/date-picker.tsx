import { View, Text, TouchableOpacity, StyleSheet, Pressable, TextInput } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Ionicons } from '@expo/vector-icons'

import BaseModal from './base-modal'
import useStyles from '@/src/hooks/useStyle'
import Button from './button'
import useDb from '@/src/hooks/useDb'
import MoodDisplay from '../days/mood-display'
import { Day } from '@/src/interfaces/day'
import useDate from '@/src/hooks/useDate'

interface DatePickerProps {
    value: string
    onChange: React.Dispatch<React.SetStateAction<string>>
    buttonText: string
    extras?: boolean
}

const DatePicker: React.FC<DatePickerProps> = ({ value, buttonText, extras, onChange }) => {
    const { styles, colors } = useStyles()
    const { t } = useTranslation()
    const { CustomModal, hideModal } = BaseModal(true)
    const [year, setYear] = useState<number>(0)
    const [month, setMonth] = useState<number>(0)
    const [day, setDay] = useState<number>(0)
    const [monthsRendered, setMonthsRendered] = useState<boolean>(false)
    const [yearsRendered, setYearsRendered] = useState<boolean>(false)
    const { useDays } = useDb()
    const [days, setDays] = useState<Day[]>([])
    const dateH = useDate()
    const [date, setDate] = useState(value)

    useEffect(() => {
        onChange(date)
    }, [date])

    useEffect(() => {
        const split = value.split("/")
        setYear(Number(split[0]))
        setMonth(Number(split[1]) - 1)
        setDay(Number(split[2]))
        if (extras === undefined || extras === false) return
        const loadDays = async () => {
            const days = await useDays.getMonth(value)
            setDays(days)
        }
        loadDays()
    }, [])

    const handleChangeMonth = (value: number) => {
        setDate(dateH.changeMonth(value, date))
        setMonth(value)
        setMonthsRendered(false)
        setYearsRendered(false)
    }

    const handleChangeYear = (value: number) => {
        setDate(dateH.changeYear(value, date))
        setYear(value)
        setMonthsRendered(false)
        setYearsRendered(false)
    }

    const handleDayChange = (value: number) => {
        const val = dateH.changeDay(value, date)
        setDay(value)
        setMonthsRendered(false)
        setYearsRendered(false)
        const m = dateH.getMonth(val)
        const y = dateH.getYear(val)
        if (m !== month || y !== year) {
            setMonth(m)
            setYear(y)
        }
        setDate(val)
    }

    const RenderMonths = () => {
        const months = []
        for (let i = 0; i < 12; i++) {
            months.push(
                <TouchableOpacity
                    key={i}
                    onPress={() => handleChangeMonth(i)}
                    style={[styles.button, i === month && { backgroundColor: colors.colors.accentBackground }, { minWidth: "40%" }]}
                >
                    <Text style={[styles.middleText, i === month && { color: colors.colors.accentText }]}>{t('months.' + String(i))}</Text>
                </TouchableOpacity >
            )
        }
        return months
    }

    const RenderYears = () => {
        const years = []
        for (let i = year - 5; i < year + 5; i++) {
            years.push(
                <TouchableOpacity
                    key={i}
                    onPress={() => handleChangeYear(i)}
                    style={[styles.button, i === year && { backgroundColor: colors.colors.accentBackground }, { minWidth: "40%" }]}
                >
                    <Text style={[styles.middleText, i === month && { color: colors.colors.accentText }]}>{String(i)}</Text>
                </TouchableOpacity >
            )
        }
        return years
    }

    const RenderDays = () => {
        const days = []
        const firstDay = dateH.firtsDayOfMonth(date)
        const lastDay = dateH.lastDayOfMonth(date)
        for (let i = 0; i < firstDay; i++) {
            days.push(
                <View key={i + "void"} style={styles2.dayCellVoid} />
            )
        }

        for (let i = 1; i <= lastDay; i++) {
            days.push(
                <TouchableOpacity
                    key={i}
                    onPress={() => handleDayChange(i)}
                    style={[styles2.dayCell, i === day && { backgroundColor: colors.colors.accentBackground }]}
                >
                    <RenderMoodDisplay day={i} />
                    <Text style={[styles.middleText, i === day && { color: colors.colors.accentText }]}>{i}</Text>
                </TouchableOpacity >
            )
        }

        return days
    }

    const RenderMoodDisplay = ({ day }: { day: number }) => {
        if (!extras) return
        if (days.length === 0) return
        const d = dateH.create(`${year}-${month + 1}-${day + 1}`)
        const dayData = days.find((v) => v.date === d)
        console.log(dayData?.date, d)
        if (dayData && dayData.difference != "") {
            return (
                <MoodDisplay mood={dayData.difference} horizontal={false} />
            )
        }
    }

    const RenderDaysHeader = () => {
        const daysHeader = []
        for (let i = 0; i < 7; i++) {
            daysHeader.push(
                <Text style={styles2.dayText} key={i}>{t('daysShort.' + String(i))}</Text>
            )
        }
        return daysHeader
    }

    const ConditionalRendering = () => {
        if (monthsRendered) {
            return (
                <View style={[styles2.calendarGrid, { justifyContent: "space-around" }]}>
                    <RenderMonths />
                </View>
            )
        } else if (yearsRendered) {
            return (
                <View style={[styles2.calendarGrid, { justifyContent: "space-around" }]}>
                    <RenderYears />
                </View>
            )
        } else {
            return (
                <View style={{ width: "100%", gap: 10, marginTop: 10 }}>
                    <View style={styles2.calendarGrid}>
                        <RenderDaysHeader />
                    </View>
                    <View style={styles2.calendarGrid}>
                        <RenderDays />
                    </View>
                </View>
            )
        }
    }

    enum RenderOptions {
        "months" = "months",
        "days" = "days",
        "years" = "years"
    }


    const handleSetRender = (option: RenderOptions, value: boolean) => {
        switch (option) {
            case RenderOptions.months:
                setMonthsRendered(value)
                setYearsRendered(false)
                break
            case RenderOptions.days:
                setMonthsRendered(false)
                setYearsRendered(false)
                break
            case RenderOptions.years:
                setMonthsRendered(false)
                setYearsRendered(value)
                break
        }
    }

    const onTodayPress = () => {
        const newDate = dateH.create()
        setDate(newDate)
        setYear(dateH.getYear(newDate))
        setMonth(dateH.getMonth(newDate))
        setDay(dateH.getDay(newDate))

    }

    const handleArrowPress = (value: number) => {
        const newDay = day + value
        handleDayChange(newDay)
    }



    return (
        <View style={[styles.row, !extras && { justifyContent: "center" }]}>
            {
                extras &&
                <Button
                    onPress={() => handleArrowPress(-1)}
                >
                    <Ionicons name="chevron-back" size={24} color="black" />
                </Button>
            }
            <CustomModal
                button={<Button onPress={() => { }}><Text style={styles.text}>{buttonText}</Text></Button>}
            >
                <View style={[styles.row, { justifyContent: "space-between" }]}>
                    <TouchableOpacity onPress={() => handleChangeMonth(month - 1)} style={styles.button}>
                        <Ionicons name="caret-back" size={24} color={colors.colors.primaryText} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleSetRender(RenderOptions.months, !monthsRendered)} style={styles.button}>
                        <Text style={styles.text}>
                            {t('months.' + String(dateH.getMonth(date)))}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleSetRender(RenderOptions.years, !yearsRendered)} style={styles.button}>
                        <Text style={styles.text}>
                            {" " + dateH.getYear(date) + " "}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleChangeMonth(month + 1)} style={styles.button}>
                        <Ionicons name="caret-forward" size={24} color={colors.colors.primaryText} />
                    </TouchableOpacity>
                </View>
                <ConditionalRendering />
                <View style={styles.row}>
                    <TouchableOpacity onPress={hideModal} style={styles.button}><Text style={styles.text}>
                        {t("datePicker.cancel")}
                    </Text></TouchableOpacity>
                    <TouchableOpacity onPress={onTodayPress} style={styles.enfasizedButton}><Text style={styles.enfasizedText}>
                        {t("datePicker.today")}
                    </Text></TouchableOpacity>
                </View>
            </CustomModal>
            {
                extras &&
                <Button
                    onPress={() => handleArrowPress(1)}
                >
                    <Ionicons name="chevron-forward" size={24} color="black" />
                </Button>
            }

        </View>
    )
}

const styles2 = StyleSheet.create({
    calendarGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%',
        gap: 5,
    },
    dayCell: {
        minWidth: 40,
        minHeight: 40,
        maxHeight: 40,
        maxWidth: 40,
        elevation: 5,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        flexDirection: 'row',
        overflow: 'hidden',
    },
    dayCellVoid: {
        minWidth: 40,
        minHeight: 40,
    },
    dayText: {
        textAlign: 'center',
        minWidth: 40,
    },
    // Add other styles as needed
})

export default DatePicker
