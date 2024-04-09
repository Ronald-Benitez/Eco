import { View, Text, Pressable, TextStyle, StyleProp } from 'react-native'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { Group, Item, ItemType } from '@/src/interfaces/finances'
import useStyles from '@/src/hooks/useStyle'
import SwipeItem from '../ui/swipe-item'
import AddItem from './add-item'
import useDate from '@/src/hooks/useDate'
import groupsHandler, { GroupTable } from '@/src/db/groups-handler'
import itemsHandler from '@/src/db/items-handler'
import { ScrollView } from 'react-native-gesture-handler'
import useToast from '@/src/hooks/useToast'

interface ItemsTableProps {
    items: Item[]
    setItems: React.Dispatch<React.SetStateAction<Item[]>>
    group: Group | null
    setGroup: React.Dispatch<React.SetStateAction<Group | null>>
    table: GroupTable
}

const ItemsTable = ({ group, items, setGroup, setItems, table }: ItemsTableProps) => {
    const { styles, colors } = useStyles()
    const [selected, setSelected] = React.useState<Item | undefined>()
    const [openUpdate, setOpenUpdate] = React.useState<boolean>(false)
    const iTable = table === "registerGroup" ? "registerList" : "savingsList"
    const db = groupsHandler({ table })
    const idb = itemsHandler({ table: iTable })
    const dateh = useDate()
    const { ToastContainer, showToast } = useToast()
    const { t } = useTranslation()
    const ecolor = colors.financials?.expense
    const icolor = colors.financials?.income

    const handleDelete = async (index: number) => {
        if (!group) return
        const toDelete = items[index]
        await idb.deleteItem(toDelete.id)
        setItems(await idb.getItems(group.id))
        const newGroup = {
            ...group
        }
        if (toDelete.type === "expense") {
            const expenses = await idb.getExpenses(group.id)
            newGroup.expenses = expenses
        } else {
            const incomes = await idb.getIncomes(group.id)
            newGroup.incomes = incomes
        }
        await db.updateGroup(newGroup)
        setGroup(newGroup)
        showToast({ message: t("item.deleted"), type: "SUCCESS" })
    }

    const handleUpdate = (index: number) => {
        const select = items[index]
        setSelected(select)
        setOpenUpdate(true)
    }

    const color = (type: ItemType): StyleProp<TextStyle> => {
        const c: StyleProp<TextStyle> = {
            backgroundColor: "#fff"
        }
        if (type === "expense") {
            c.borderColor = ecolor
            c.color = ecolor
        } else {
            c.borderColor = icolor
            c.color = icolor
        }
        return c
    }

    return (
        <ScrollView>
            <View style={[styles.dropdowmContainer, { marginBottom: 50, padding: 20 }]}>
                {items.map((item, index) => {
                    const c = color(item.type)
                    return (
                        <SwipeItem key={item.id + item.type}
                            handleDelete={() => handleDelete(index)}
                            handleUpdate={() => handleUpdate(index)}
                            style={[styles.horizontalBlock, c, { borderWidth: 1 }]}
                        >
                            <View style={[styles.row, { justifyContent: "space-between" }]}>
                                <View style={{ flex: 2, flexDirection: "row" }}>
                                    {
                                        dateh.getStringDate(item.date).split(" ").map(e => (
                                            <Text style={[styles.smallText, styles.verticalText, c]} key={e}>
                                                {e}
                                            </Text>
                                        ))
                                    }
                                </View>
                                <Text style={[styles.middleText, c, { flex: 4 }]}>{item.name}</Text>
                                <Text style={[styles.middleText, c, { flex: 2 }]}>${item.value}</Text>
                            </View>
                        </SwipeItem>
                    )
                })}
            </View>
            <ToastContainer />
            <AddItem
                group={group}
                items={items}
                setGroup={setGroup}
                setItems={setItems}
                table={iTable}
                openUpdate={openUpdate}
                setOpenUpdate={setOpenUpdate}
                item={selected}
            />
        </ScrollView>
    )
}

export default ItemsTable