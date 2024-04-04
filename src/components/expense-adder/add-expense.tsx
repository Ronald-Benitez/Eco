import { View, Text, TouchableOpacity, TextInput, Modal, Pressable } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Ionicons } from '@expo/vector-icons'

import { ExpenseAdd } from '@/src/interfaces/expenses'
import useStyles from '@/src/hooks/useStyle'
import { useTranslation } from 'react-i18next'
import useToast from '@/src/hooks/useToast'

interface ExpenseAdderProps {
    expenses: ExpenseAdd[]
    setExpenses: React.Dispatch<React.SetStateAction<ExpenseAdd[]>>
    expense?: ExpenseAdd | null
    children?: React.ReactNode
    openUpdate?: boolean
    setOpenUpdate?: React.Dispatch<React.SetStateAction<boolean>>
}

const AddExpense = ({ expenses, expense, setExpenses, children, openUpdate, setOpenUpdate }: ExpenseAdderProps) => {
    const [name, setName] = useState<string>('')
    const [value, setValue] = useState<string>('0')
    const [quantity, setQuantity] = useState<string>('1')
    const [modalVisible, setModalVisible] = useState(false)
    const { styles } = useStyles()
    const { t } = useTranslation()
    const { showToast, ToastContainer } = useToast()

    useEffect(() => {
        if (!expense) return
        setName(expense.name)
        setValue(String(expense.value))
        setQuantity(String(expense.quantity))
    }, [expense])

    useEffect(() => {
        if (!openUpdate || !setOpenUpdate) return
        setModalVisible(true)
        setOpenUpdate(false)
    }, [openUpdate])

    const onAdd = () => {
        if (!name || !value || !quantity) {
            return showToast({ message: t('expense-adder.error'), type: 'ERROR' })
        }
        const newExpense = {
            name,
            value: parseFloat(value),
            quantity: parseInt(quantity)
        }
        if (expense) {
            const newExpenses = expenses.map((e) => {
                if (e.name === expense.name) {
                    return newExpense
                }
                return e
            })
            setExpenses(newExpenses)
        } else {
            setExpenses([...expenses, newExpense])
            cleanData()
        }
        setModalVisible(false)
    }


    const cleanData = () => {
        setName('')
        setValue("0")
        setQuantity("1")
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
                            <Text style={styles.title}>{
                                expense ? t('expense-adder.edit') : t('expense-adder.add')
                            }</Text>
                            <View style={styles.col}>
                                <Text style={[styles.text, styles.textCenter]}>{t("expense-adder.name")}</Text>
                                <TextInput
                                    style={[styles.input]}
                                    placeholder={t('expense-adder.name')}
                                    value={name}
                                    onChangeText={setName}
                                />
                            </View>
                            <View style={styles.col}>
                                <Text style={[styles.text, styles.textCenter]}>{t("expense-adder.value")}</Text>

                                <TextInput
                                    style={[styles.input]}
                                    placeholder={t("expense-adder.value")}
                                    keyboardType='numeric'
                                    value={value}
                                    onChangeText={setValue}
                                />
                            </View>
                            <View style={styles.col}>
                                <Text style={[styles.text, styles.textCenter]}>{t("expense-adder.quantity")}</Text>
                                <TextInput
                                    style={[styles.input]}
                                    placeholder={t("expense-adder.quantity")}
                                    keyboardType='numeric'
                                    value={quantity}
                                    onChangeText={setQuantity}
                                />
                            </View>
                            <View style={styles.col}>
                                <Text style={[styles.text, styles.textCenter]}>{t("expense-adder.total")}</Text>
                                <TextInput style={[styles.input]} editable={false} >
                                    ${
                                        parseFloat(value) * parseInt(quantity)
                                    }
                                </TextInput>
                            </View>
                            <View style={styles.row}>
                                <TouchableOpacity
                                    style={[styles.button, { width: "49%" }]}
                                    onPress={() => setModalVisible(false)}
                                >
                                    <Text style={[styles.text, styles.textCenter]}>{t("expense-adder.cancel")}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.enfasizedButton, { width: "49%" }]}
                                    onPress={onAdd}
                                >
                                    <Text style={styles.enfasizedText}>{
                                        expense ? t('expense-adder.edit') : t('expense-adder.add')
                                    }</Text>
                                </TouchableOpacity>

                            </View>
                        </>
                    </Pressable>
                </Pressable>
            </Modal>
            <ToastContainer />
        </>
    )
}

export default AddExpense