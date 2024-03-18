import { View, Text, TouchableOpacity, StyleSheet, Pressable, TextInput } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Ionicons } from '@expo/vector-icons'

import BaseModal from './base-modal'
import useStyles from '@/src/hooks/useStyle'
import Button from './button'

interface DatePickerProps {
    value: string
    onChange: (value: string) => void
    buttonText: string
}

const DatePicker: React.FC<DatePickerProps> = ({ onChange, value, buttonText }) => {
    const { styles, colors } = useStyles()
    const { t } = useTranslation()
    const { CustomModal, hideModal, showModal } = BaseModal(true)
    const [year, setYear] = useState<number>(0)
    const [yearText, setYearText] = useState<string>("")
    const [month, setMonth] = useState<number>(0)
    const [day, setDay] = useState<number>(0)
    const [monthsRendered, setMonthsRendered] = useState<boolean>(false)
    const [yearsRendered, setYearsRendered] = useState<boolean>(false)

    useEffect(() => {
        const date = new Date(value)
        setYear(date.getFullYear())
        setMonth(date.getMonth())
        setDay(date.getDate())
    }, [])

    const reset = () => {
        const date = new Date()
        setYear(date.getFullYear())
        setMonth(date.getMonth())
        setDay(date.getDate())
        onChange(date.toISOString())
    }


    const handleDayChange = (value: number) => {
        setDay(value)
        const date = new Date(year, month, value)
        onChange(date.toISOString())
        hideModal()
    }

    const handleChangeMonth = (value: number) => {
        const date = new Date(year, month + value, day)
        setMonth(date.getMonth())
        onChange(date.toISOString())
    }

    const handleChangeYear = (value: number) => {
        const date = new Date(value, month, day)
        setYear(date.getFullYear())
        onChange(date.toISOString())
    }

    const RenderMonths = () => {
        const months = []
        for (let i = 0; i < 12; i++) {
            months.push(
                <TouchableOpacity
                    key={i}
                    onPress={() => handleChangeMonth(i - month)}
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
        const firstDay = new Date(year, month, 1).getDay()
        const lastDay = new Date(year, month + 1, 0).getDate()

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
                    <Text style={[styles.middleText, i === day && { color: colors.colors.accentText }]}>{i}</Text>
                </TouchableOpacity >
            )
        }

        return days
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

    return (
        <CustomModal
            button={<Button onPress={() => { }}><Text style={styles.text}>{buttonText}</Text></Button>}
        >
            <View style={[styles.row, { justifyContent: "space-between" }]}>
                <TouchableOpacity onPress={() => handleChangeMonth(-1)} style={styles.button}>
                    <Ionicons name="caret-back" size={24} color={colors.colors.primaryText} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleSetRender(RenderOptions.months, !monthsRendered)} style={styles.button}>
                    <Text style={styles.text}>
                        {t('months.' + String(month))}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleSetRender(RenderOptions.years, !yearsRendered)} style={styles.button}>
                    <Text style={styles.text}>
                        {" " + year}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleChangeMonth(1)} style={styles.button}>
                    <Ionicons name="caret-forward" size={24} color={colors.colors.primaryText} />
                </TouchableOpacity>
            </View>
            <ConditionalRendering />
            <View style={styles.row}>
                <TouchableOpacity onPress={hideModal} style={styles.button}><Text style={styles.text}>Cancel</Text></TouchableOpacity>
                <TouchableOpacity onPress={reset} style={styles.enfasizedButton}><Text style={styles.enfasizedText}>Today</Text></TouchableOpacity>
            </View>
        </CustomModal>
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
        elevation: 5,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
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
