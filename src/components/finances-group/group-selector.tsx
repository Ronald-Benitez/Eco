import { View, Text, TouchableOpacity, ScrollView, TextInput, Modal, Pressable } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import * as SQlite from "expo-sqlite/next"

import groupsHandler, { GroupTable } from '@/src/db/groups-handler'
import { Group } from '@/src/interfaces/finances'
import BaseModal from '../ui/base-modal'
import useStyles from '@/src/hooks/useStyle'

interface GroupSelectorProps {
    table: GroupTable
    setGroup: React.Dispatch<React.SetStateAction<Group | null>>
    group: Group | null
}

const GroupSelector = ({ group, setGroup, table }: GroupSelectorProps) => {
    const { t } = useTranslation()
    const db = groupsHandler({ table })
    const [groups, setGroups] = useState<Group[]>([])
    const [year, setYear] = useState<string>(new Date().getFullYear().toString())
    const [modalVisible, setModalVisible] = useState(false)
    const { styles } = useStyles()

    const getGroups = async () => {
        const groups = await db.getGroupsByYear(year)
        setGroups(groups)
    }

    const onBtnPress = () => {
        getGroups()
        setModalVisible(true)
    }

    useEffect(() => {
        if (year.length !== 4) return
        getGroups()
    }, [year])

    const onSelect = (group: Group) => {
        setGroup(group)
        setModalVisible(false)
    }

    return (
        <>
            <TouchableOpacity onPress={onBtnPress} style={styles.button}>
                <Text style={styles.text}>{group ? group.name : t("group.select-group")}</Text>
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
                                <Text style={styles.title}>{t("group.select-group")}</Text>
                                <TextInput style={[styles.input, { textAlign: "center" }]} value={year} onChangeText={setYear} />
                                <ScrollView style={[{ maxHeight: 400, minWidth: 300 }]}>
                                    {groups.map((group) => (
                                        <TouchableOpacity key={group.id} onPress={() => onSelect(group)} style={[styles.button, { marginTop: 10, elevation: 0 }]}>
                                            <Text style={styles.text}>{group.name}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </ScrollView>
                            </View>
                        </>
                    </Pressable>
                </Pressable>
            </Modal>
        </>
    )
}

export default GroupSelector