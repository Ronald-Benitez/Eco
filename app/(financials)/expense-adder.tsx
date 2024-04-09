import { View, Text, Touchable, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Storage from "expo-storage";
import { Ionicons } from '@expo/vector-icons'
import { useTranslation } from 'react-i18next'

import useStyles from '@/src/hooks/useStyle'
import { ExpenseAdd } from '@/src/interfaces/expenses';
import AddExpense from '@/src/components/expense-adder/add-expense';
import ExpensesTable from '@/src/components/expense-adder/expenses-table';
import Confirm from '@/src/components/ui/confirm';

const ExpenseAdder = () => {
    const { styles, colors } = useStyles()
    const [expenses, setExpenses] = useState<ExpenseAdd[]>([])
    const [total, setTotal] = useState<number>(0)
    const [index, setIndex] = useState<number>(1)
    const { t } = useTranslation()
    const color = colors?.financials?.expense
    const baseColor = colors?.colors?.primaryText
    const enfasizedColor = colors?.colors?.accentText

    useEffect(() => {
        loadExpenses(index)
    }, [])

    const loadExpenses = async (i: number) => {
        const expenses = await Storage.getItem({ key: `expenses${i}` })
        if (!expenses) {
            setExpenses([])
            return
        }
        const parsedExpenses = JSON.parse(expenses)
        setExpenses(parsedExpenses)
    }

    useEffect(() => {
        if (!expenses) return
        const total = expenses.reduce((acc, curr) => {
            return acc + (curr.value * curr.quantity)
        }, 0)
        setTotal(total)
        Storage.setItem({ key: `expenses${index}`, value: JSON.stringify(expenses) })
    }, [expenses])

    const deleteAll = () => {
        setExpenses([])
        Storage.removeItem({ key: `expenses${index}` })
    }

    const changeIndex = (i: number) => {
        setIndex(index + i)
        loadExpenses(index + i)
    }

    const verifyDisabled = (opt: "left" | "right") => {
        if (opt === "left") {
            return index === 1
        }
        return index === 5
    }

    return (
        <View style={styles.container}>
            <Text style={[styles.textColor, { borderColor: color, color }]}>${total}</Text>
            <ExpensesTable expenses={expenses} setExpenses={setExpenses} />
            <View style={styles.fixedBottom}>
                <TouchableOpacity
                    onPress={() => changeIndex(-1)} disabled={verifyDisabled("left")}
                    style={verifyDisabled("left") ? styles.disabledButton : styles.button}>
                    <Ionicons name="arrow-back" size={24} color={baseColor} />
                </TouchableOpacity>
                <Confirm onConfirm={deleteAll} title={t("delete")} message={t("confirmDelete")}>
                    <View style={styles.button}>
                        <Ionicons name="trash-bin-outline" size={24} color={baseColor} />
                    </View>
                </Confirm>
                <Text style={styles.textColor}>{index}</Text>
                <AddExpense expenses={expenses} setExpenses={setExpenses} >
                    <View style={styles.enfasizedButton}>
                        <Ionicons name="add" size={24} color={enfasizedColor} />
                    </View>
                </AddExpense>
                <TouchableOpacity
                    onPress={() => changeIndex(1)} disabled={verifyDisabled("right")}
                    style={verifyDisabled("right") ? styles.disabledButton : styles.button}>
                    <Ionicons name="arrow-forward" size={24} color={baseColor} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ExpenseAdder