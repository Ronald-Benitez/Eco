import { View, Text, ViewStyle, TextStyle } from "react-native"
import { useTranslation } from "react-i18next"
import React, { SetStateAction } from "react"

import { Group } from "@/src/interfaces/finances"
import useStyles from "@/src/hooks/useStyle"
import Dropdown from "../ui/dropdown"
import SwipeItem from "../ui/swipe-item"
import AddGroup from "./add-group"
import groupsHandler, { GroupTable } from '@/src/db/groups-handler'
import itemsHandler, { ItemsTable } from "@/src/db/items-handler"
import useToast from "@/src/hooks/useToast"

interface GroupViewerProps {
    group: Group | null
    setGroup: React.Dispatch<SetStateAction<Group | null>>
    table: GroupTable
}

const GroupViewer = ({ group, setGroup, table }: GroupViewerProps) => {
    const { styles, colors } = useStyles()
    const { t } = useTranslation()
    const [openUpdate, setOpenUpdate] = React.useState<boolean>(false)
    const db = groupsHandler({ table })
    const iTable = table === "registerGroup" ? "registerList" : "savingsList"
    const idb = itemsHandler({ table: iTable })
    const { ToastContainer, showToast } = useToast()

    const ec = colors.financials?.expense
    const ic = colors.financials?.income
    const gc = colors.financials?.goal

    if (!group) return

    const color = (type: "i" | "e" | "g"): TextStyle => {
        switch (type) {
            case "i":
                return {
                    borderColor: ic,
                    color: ic
                }
            case "e":
                return {
                    borderColor: ec,
                    color: ec
                }
            case "g": {
                return {
                    borderColor: gc,
                    color: gc
                }
            }
        }
    }

    const balanceColor = (): TextStyle => {
        const balance = group.incomes - group.expenses

        if (balance < 0) return color("e")
        if (balance > 0) return color("i")
        return color("g")

    }

    const onDelete = async () => {
        await db.deleteGroup(group.id)
        setGroup(null)
        await idb.deleteByGroup(group.id)
        showToast({ message: t("group.deleted"), type: "SUCCESS" })
    }

    const onUpdate = () => {
        setOpenUpdate(true)
    }

    const Block = ({ type }: { type: "i" | "e" | "g" | "b" }) => {

        const baseColors = type === "b" ? balanceColor() : color(type);
        const names = {
            "i": "incomes",
            "e": "expenses",
            "g": "goal",
            "b": "balance"
        }
        const Index = names[type]
        //@ts-ignore
        const value = type === "b" ? group.incomes - group.expenses : group[Index]

        return (
            <>
                <View
                    style={[baseColors, styles.borderedContainer]}
                >
                    <Text style={[styles.text, baseColors, styles.textCenter]}>
                        {t(`group.${names[type]}`)}
                    </Text>
                    <Text style={[styles.text, baseColors, styles.textCenter]}>
                        ${value}
                    </Text>
                </View>
            </>
        )
    }

    return (
        <>
            <Dropdown title="" col={true} defaulActive={true}>
                <SwipeItem
                    handleDelete={onDelete}
                    handleUpdate={onUpdate}
                    style={[styles.col, { backgroundColor: "#fff" }]}
                    top={50}>
                    <View style={[styles.row, { paddingHorizontal: 20, paddingTop: 10 }]}>
                        <Block type="i" />
                        <Block type="g" />
                    </View>
                    <View style={[styles.row, { paddingHorizontal: 20, paddingBottom: 10 }]}>
                        <Block type="e" />
                        <Block type="b" />
                    </View>
                </SwipeItem>
            </Dropdown>
            <AddGroup
                openUpdate={openUpdate}
                setOpenUpdate={setOpenUpdate}
                table={table}
                group={group}
                setGroup={setGroup}
            />
            <ToastContainer />
        </>
    )

}

export default GroupViewer