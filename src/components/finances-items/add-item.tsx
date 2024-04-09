import React, { useState, useEffect } from "react";
import { View, Modal, ScrollView, Pressable, Text, TextInput, TouchableOpacity, StyleProp, TextStyle } from "react-native";
import { useTranslation } from "react-i18next";

import itemsHandler, { ItemsTable } from "@/src/db/items-handler";
import { Item, Group, ItemType, BasicItem } from "@/src/interfaces/finances";
import useDate from "@/src/hooks/useDate";
import useStyles from "@/src/hooks/useStyle";
import groupsHandler from "@/src/db/groups-handler";
import useToast from "@/src/hooks/useToast";
import DatePicker from "../ui/date-picker";

interface AddItemProps {
    table: ItemsTable
    items: Item[]
    setItems: React.Dispatch<React.SetStateAction<Item[]>>
    group: Group | null
    setGroup: React.Dispatch<React.SetStateAction<Group | null>>
    item?: Item
    children?: React.ReactNode
    openUpdate?: boolean
    setOpenUpdate?: React.Dispatch<React.SetStateAction<boolean>>
}

const AddItem = ({ group, items, setGroup, setItems, table, item, children, openUpdate, setOpenUpdate }: AddItemProps) => {
    const dateH = useDate()
    const { t } = useTranslation()
    const [name, setName] = useState<string>("")
    const [date, setDate] = useState<string>(dateH.create())
    const [type, setType] = useState<ItemType>("expense")
    const [value, setValue] = useState<string>("0")
    const [group_id, setGroupId] = useState<number>(group?.id || 0)
    const [modalVisible, setModalVisible] = useState(false)
    const rtable = table === "registerList" ? "registerGroup" : "savingsGroup"
    const idb = itemsHandler({ table })
    const db = groupsHandler({ table: rtable })
    const { colors, styles } = useStyles()
    const ecolor = colors.financials?.expense
    const icolor = colors.financials?.income
    const [color, setColor] = useState<StyleProp<TextStyle>>({
        borderColor: ecolor,
        color: ecolor
    })
    const { ToastContainer, showToast } = useToast()

    useEffect(() => {
        if (!group) return
        setGroupId(group.id)
    }, [group])

    useEffect(() => {
        if (!item) return
        setName(item.name)
        setValue(String(item.value))
        setDate(item.date)
        if (item.type != type) {
            onTypeChange()
        }
        setGroupId(item.group_id)
    }, [item])

    useEffect(() => {
        if (!openUpdate || !setOpenUpdate) return
        setModalVisible(true)
        setOpenUpdate(false)
    }, [openUpdate])


    const onTypeChange = () => {
        if (type === "expense") {
            setType("income")
            setColor({
                borderColor: icolor,
                color: icolor
            })
        } else {
            setType("expense")
            setColor({
                borderColor: ecolor,
                color: ecolor
            })
        }
    }

    const onSave = async () => {
        if (!group) return

        if (value === "" || name === "") {
            showToast({ message: t("item.error"), type: "ERROR" })
            return
        }

        const newItem: BasicItem = {
            date,
            group_id,
            name,
            type,
            value: Number(value)
        }

        const updatedGroup: Group = {
            ...group
        }
        if (item) {
            await idb.updateItem({
                ...newItem,
                id: item.id
            })
            showToast({ message: t("item.edited"), type: "SUCCESS" })
        } else {
            await idb.insertItem(newItem)
            showToast({ message: t("item.added"), type: "SUCCESS" })
            setName("")
            setValue("")
        }
        updatedGroup.expenses = await idb.getExpenses(group_id)
        updatedGroup.incomes = await idb.getIncomes(group_id)
        setItems(await idb.getItems(group_id))
        updateGroup(updatedGroup)
    }

    const updateGroup = (g: Group) => {
        setGroup(g)
        db.updateGroup(g)
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
                    <ScrollView style={{ maxHeight: 600 }}>
                        <Pressable onPress={() => { }} style={[styles?.modalContent]}>
                            <View style={styles.modalContent}>
                                <Text style={styles.title}>
                                    {item ? t('item.edit') : t('item.add')}
                                </Text>
                                <Text style={styles.middleText}>{t('item.name')}</Text>
                                <TextInput
                                    style={styles.input}
                                    value={name}
                                    onChangeText={setName}
                                />
                                <Text style={styles.middleText}>{t('item.type')}</Text>
                                <TouchableOpacity onPress={onTypeChange} style={styles.button}>
                                    <Text style={[styles.text, styles.textCenter, color]}>
                                        {t(`item.${type}`)}
                                    </Text>
                                </TouchableOpacity>
                                <Text style={styles.middleText}>{t('item.value')}</Text>
                                <TextInput
                                    style={[styles.input, color]}
                                    onChangeText={setValue}
                                    value={value}
                                    keyboardType="numeric"
                                />
                                <Text style={styles.middleText}>{t('item.date')}</Text>
                                <DatePicker buttonText={dateH.getStringDate(date)} onChange={setDate} value={date} />

                                <View style={styles.row}>
                                    <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.button}>
                                        <Text style={styles.text}>{t('group.cancel')}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={onSave} style={styles.enfasizedButton}>
                                        <Text style={styles.enfasizedText}>{t('group.save')}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Pressable>
                    </ScrollView>
                </Pressable>
                <ToastContainer />
            </Modal>
        </>
    )

}

export default AddItem