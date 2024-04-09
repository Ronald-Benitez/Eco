import { View, Text, TouchableOpacity, ScrollView, TextInput, Modal, Pressable } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import groupsHandler, { GroupTable } from '@/src/db/groups-handler'
import { Group } from '@/src/interfaces/finances'
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

    const getPlaceHolder = (group: Group) => {
        return group.name + " (" + t("months." + Number(group.month)) + " " + group.year + ")"
    }

    return (
        <>
            <TouchableOpacity onPress={onBtnPress} style={styles.button}>
                <Text style={styles.text}>{group ?
                    getPlaceHolder(group)
                    : t("group.select-group")}</Text>
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
                                <View style={[styles.row, { width: "100%", justifyContent: "center" }]}>
                                    <TextInput style={[styles.input, { textAlign: "center" }]} value={year} onChangeText={setYear} />
                                </View>
                                <ScrollView style={[{ maxHeight: 400, minWidth: 300 }]}>
                                    {groups.map((group) => (
                                        <TouchableOpacity key={group.id} onPress={() => onSelect(group)} style={[styles.button, { marginTop: 10, elevation: 0 }]}>
                                            <Text style={styles.text}>
                                                {getPlaceHolder(group)}
                                            </Text>
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