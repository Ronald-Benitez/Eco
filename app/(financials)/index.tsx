import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { AntDesign, Ionicons } from '@expo/vector-icons'
import Storage from "expo-storage";

import groupsHandler, { GroupTable } from '@/src/db/groups-handler'
import itemsHandler, { ItemsTable } from '@/src/db/items-handler';
import { Group, Item } from '@/src/interfaces/finances'
import AddGroup from '@/src/components/finances-group/add-group'
import GroupSelector from '@/src/components/finances-group/group-selector'
import GroupViewer from '@/src/components/finances-group/group-viewer'
import AddItem from '@/src/components/finances-items/add-item';
import useStyles from '@/src/hooks/useStyle'
import Table from '@/src/components/finances-items/items-table';

interface props {
    table: GroupTable,
    itable: ItemsTable
}

const Index = ({ itable = "registerList", table = "registerGroup" }: props) => {
    const { t } = useTranslation()
    const { styles, colors } = useStyles()
    const baseColor = colors.colors.primaryText
    const [group, setGroup] = useState<Group | null>(null)
    const [items, setItems] = useState<Item[]>([])
    const [pinned, setPinned] = useState<number>(0)
    const db = groupsHandler({ table })
    const idb = itemsHandler({ table: itable })
    const pin = table === "registerGroup" ? "register" : "saving"
    const textColor = colors.colors?.primaryText
    const accentText = colors.colors?.accentText

    useEffect(() => {
        getPinned()
    }, [])

    useEffect(() => {
        if (!group) return
        idb.getItems(group.id).then(e => {
            setItems(e)
        })
    }, [group?.id])

    const pinUp = async () => {
        if (!group) return
        if (pinned != 0 && pinned === group?.id) {
            await Storage.removeItem({ key: pin })
            setPinned(0)
        } else {
            await Storage.setItem({ key: pin, value: String(group.id) });
            setPinned(group.id)
        }
    }

    const getPinned = async () => {
        const pinned = await Storage.getItem({ key: pin });
        if (pinned) {
            const p = Number(pinned)
            db.getGroup(p).then(g => {
                setGroup(g as Group)
            })
            if (p) {
                idb.getItems(p).then(e => {
                    setItems(e)
                })
            }
            setPinned(p)
        } else {
            db.getLastGroup().then(g => {
                setGroup(g as Group)
                if (g) {
                    idb.getItems(g.id).then(e => {
                        setItems(e)
                    })
                }
            })
        }
    }

    const Pin = () => {
        let isPinned = false

        if (pinned != 0 && pinned === group?.id) {
            isPinned = true
        }

        return (
            <TouchableOpacity style={styles.button} onPress={pinUp}>
                <Ionicons name={isPinned ? "pin" : "pin-outline"} size={24} color={textColor} />
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <GroupSelector table={table} group={group} setGroup={setGroup} />
                <Pin />
            </View>
            <GroupViewer group={group} setGroup={setGroup} table={table} />
            <Table group={group} setGroup={setGroup} items={items} setItems={setItems} table={table} />
            <View style={styles.fixedBottom}>
                <AddGroup table={table}>
                    <View style={styles.button}>
                        <AntDesign name="addfolder" size={24} color={baseColor} />
                    </View>
                </AddGroup>
                {
                    group && (
                        <AddItem
                            items={items} setGroup={setGroup} group={group} table={itable}
                            setItems={setItems} >
                            <View style={styles.enfasizedButton}>
                                <AntDesign name='addfile' size={24} color={accentText} />
                            </View>
                        </AddItem>
                    )}
            </View>
        </View >
    )
}

export default Index