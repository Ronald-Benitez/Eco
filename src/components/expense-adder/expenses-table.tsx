import { View, Text, Pressable } from 'react-native'
import React from 'react'

import { ExpenseAdd } from '@/src/interfaces/expenses'
import useStyles from '@/src/hooks/useStyle'
import SwipeItem from '../ui/swipe-item'
import AddExpense from './add-expense'
import { ScrollView } from 'react-native-gesture-handler'

interface ExpensesTableProps {
    expenses: ExpenseAdd[]
    setExpenses: React.Dispatch<React.SetStateAction<ExpenseAdd[]>>
}

const ExpensesTable = ({ expenses, setExpenses }: ExpensesTableProps) => {
    const { styles } = useStyles()
    const [selected, setSelected] = React.useState<ExpenseAdd | null>(null)
    const [openUpdate, setOpenUpdate] = React.useState<boolean>(false)

    const handleDelete = (index: number) => {
        const newExpenses = expenses.filter((_, i) => i !== index)
        setExpenses(newExpenses)
    }

    const handleUpdate = (index: number) => {
        const expense = expenses[index]
        setSelected(expense)
        setOpenUpdate(true)
    }

    return (
        <>
            <View style={[styles.row, { paddingHorizontal: 20 }]}>
                <Text style={[styles.text, { flex: 8 }]}>Name</Text>
                <Text style={[styles.text, { flex: 4 }]}>Value</Text>
                <Text style={[styles.text, { flex: 4 }]}>Quantity</Text>
                <Text style={[styles.text, { flex: 4 }]}>Total</Text>
            </View>
            <ScrollView>
                <View style={[styles.col, { marginTop: 10, marginBottom: 50, padding: 20 }]}>

                    {expenses.map((expense, index) => (
                        <SwipeItem key={index} handleDelete={() => handleDelete(index)} handleUpdate={() => handleUpdate(index)}>
                            <View style={styles.row}>
                                <Text style={[styles.middleText, { flex: 8 }]}>{expense.name}</Text>
                                <Text style={[styles.middleText, { flex: 4 }]}>${expense.value}</Text>
                                <Text style={[styles.middleText, { flex: 4 }]}>{expense.quantity}</Text>
                                <Text style={[styles.middleText, { flex: 4 }]}>${expense.value * expense.quantity}</Text>
                            </View>
                        </SwipeItem>
                    ))}
                </View>
            </ScrollView>
            <AddExpense expenses={expenses} setExpenses={setExpenses} expense={selected} openUpdate={openUpdate} setOpenUpdate={setOpenUpdate} />

        </>
    )
}

export default ExpensesTable