import { View, Text, Modal, TouchableOpacity, Pressable, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import useStyles from '@/src/hooks/useStyle'
import useDate from '@/src/hooks/useDate'
import useToast from '@/src/hooks/useToast'
import { Group, BasicGroup } from '@/src/interfaces/finances'
import groupsHandler, { GroupTable } from '@/src/db/groups-handler'
import MonthSelector from '../ui/month-selector'

interface AddGroupProps {
    group?: Group | null
    children?: React.ReactNode
    openUpdate?: boolean
    setOpenUpdate?: React.Dispatch<React.SetStateAction<boolean>>
    table: GroupTable
}


const AddGroup = ({ children, group, openUpdate, setOpenUpdate, table }: AddGroupProps) => {
    const { t } = useTranslation()
    const { styles, colors } = useStyles()
    const date = useDate()
    const { ToastContainer, showToast } = useToast()
    const [modalVisible, setModalVisible] = useState(false)
    const [name, setName] = useState<string>('')
    const [expenses, setExpenses] = useState<number>(0)
    const [incomes, setIncomes] = useState<number>(0)
    const [goal, setGoal] = useState<number>(0)
    const today = date.create()
    const [month, setMonth] = useState<string>(String(date.getMonthComplete(today)))
    const [year, setYear] = useState<string>(String(date.getYear(today)))
    const expensesColor = colors.financials?.expense
    const incomesColor = colors.financials?.income
    const db = groupsHandler({ table })

    useEffect(() => {
        if (!group) return
        setName(group.name)
        setExpenses(group.expenses)
        setIncomes(group.incomes)
        setGoal(group.goal)
        setMonth(group.month)
        setYear(group.year)
    }, [group])

    useEffect(() => {
        if (!openUpdate || !setOpenUpdate) return
        setModalVisible(true)
        setOpenUpdate(false)
    }, [openUpdate])

    const cleanData = () => {
        setName('')
        setExpenses(0)
        setIncomes(0)
        setGoal(0)
        setMonth(String(date.getMonthComplete(today)))
        setYear(String(date.getYear(today)))
    }

    const onSave = async () => {
        if (!name || !month || !year) {
            return showToast({ message: t('group.error'), type: 'ERROR' })
        }

        if (year.length !== 4) {
            return showToast({ message: t('year-error'), type: 'ERROR' })
        }

        const newGroup: BasicGroup = {
            name,
            expenses,
            incomes,
            goal,
            month,
            year
        }
        if (group) {
            const updateGroup = { ...group, ...newGroup }
            await db.updateGroup(updateGroup)
        } else {
            await db.insertGroup(newGroup)
        }
        cleanData()
        setModalVisible(false)
    }




    return (
        <>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
                {children}
            </TouchableOpacity>
            <Modal
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
                transparent={true}
                animationType="slide"
            >
                <Pressable onPress={() => setModalVisible(false)} style={styles?.modalBackdrop}>
                    <Pressable onPress={() => { }} style={[styles?.modalContent]}>
                        <>
                            <View style={styles.modalContent}>
                                <Text style={styles.title}>
                                    {group ? t('group.edit') : t('group.add')}
                                </Text>
                                <Text style={styles.middleText}>{t('group.name')}</Text>
                                <TextInput
                                    style={styles.input}
                                    value={name}
                                    onChangeText={setName}
                                />
                                <Text style={styles.middleText}>{t('group.expenses')}</Text>
                                <TextInput
                                    style={[styles.input, { borderColor: expensesColor, color: expensesColor }]}
                                    value={String(expenses)}
                                    editable={false}
                                />
                                <Text style={styles.middleText}>{t('group.incomes')}</Text>
                                <TextInput
                                    style={[styles.input, { borderColor: incomesColor, color: incomesColor }]}
                                    value={String(incomes)}
                                    editable={false}
                                />
                                <Text style={styles.middleText}>{t('group.goal')}</Text>
                                <TextInput
                                    style={styles.input}
                                    value={String(goal)}
                                    onChangeText={(e) => setGoal(Number(e))}
                                    keyboardType="numeric"
                                />
                                <Text style={styles.middleText}>{t('group.month')}</Text>
                                <MonthSelector month={month} setMonth={setMonth} />
                                <Text style={styles.middleText}>{t('group.year')}</Text>
                                <TextInput
                                    style={styles.input}
                                    value={year}
                                    onChangeText={setYear}
                                    keyboardType="numeric"
                                />
                                <View style={styles.row}>
                                    <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.button}>
                                        <Text style={styles.text}>{t('group.cancel')}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={onSave} style={styles.enfasizedButton}>
                                        <Text style={styles.enfasizedText}>{t('group.save')}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </>
                    </Pressable>
                </Pressable>
                <ToastContainer />
            </Modal>
        </>
    )
}

export default AddGroup