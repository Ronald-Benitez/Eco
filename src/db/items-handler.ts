import { SQLiteStatement, useSQLiteContext } from "expo-sqlite/next";

import { Item, BasicItem } from "@/src/interfaces/finances";

export type ItemsTable = "registerList" | "savingsList";

interface ItemsHandlerProps {
    table: ItemsTable;
}

const itemsHandler = ({ table }: ItemsHandlerProps) => {
    const db = useSQLiteContext();

    const insertItem = async (item: BasicItem) => {
        let isInserted = false
        try {
            await db.runAsync(`INSERT INTO ${table} 
            (name, date, value, type, group_id ) VALUES (?,?,?,?,?)`,
                item.name,
                item.date,
                item.value,
                item.type,
                item.group_id
            )
            isInserted = true
        } catch (e) {
            console.log(e)
        }
        return isInserted
    }

    const updateItem = async (item: Item) => {
        let isUpdated = false
        console.log(item)
        try {
            await db.runAsync(`UPDATE ${table} SET
                name = ?,
                date = ?,
                value = ?,
                type = ?,
                group_id = ?
                WHERE id = ?
            `,
                item.name,
                item.date,
                item.value,
                item.type,
                item.group_id,
                item.id
            )
            isUpdated = true
        } catch (e) {
            console.log(e)
        }

        return isUpdated
    }

    const getItems = async (group_id: number) => {
        let items: Item[] = []
        try {
            items = await db.getAllAsync(`
                SELECT * FROM ${table} WHERE group_id = ? ORDER BY date ASC
            `, group_id)
        } catch (e) {
            console.log(e)
        }
        return items
    }

    const deleteItem = async (id: number) => {
        let isDeleted = false;
        try {
            await db.runAsync(`
            DELETE FROM ${table} WHERE id = ?
            `, id)
            isDeleted = true
        } catch (e) {
            console.log(e)
        }

        return isDeleted
    }

    const deleteByGroup = async (group_id: number) => {
        let isDeleted = false
        try {
            await db.runAsync(`
            DELETE FROM ${table} WHERE group_id = ?
            `, group_id)
            isDeleted = true
        } catch (e) {
            console.log(e)
        }

        return isDeleted
    }

    type SumType = [{ "SUM(value)": number }]
    const getIncomes = async (group_id: number) => {
        let sum: SumType = [{
            "SUM(value)": 0
        }]
        try {
            sum = await db.getAllAsync(
                `SELECT SUM(value) FROM ${table} WHERE group_id = ${group_id} AND type = "income"`
            ) as SumType

        } catch (e) {
            console.log(e)
        }
        return sum[0]["SUM(value)"]
    }

    const getExpenses = async (group_id: number) => {
        let sum: SumType = [{
            "SUM(value)": 0
        }]
        try {
            sum = await db.getAllAsync(
                `SELECT SUM(value) FROM ${table} WHERE group_id = ${group_id} AND type = "expense"`
            ) as SumType

        } catch (e) {
            console.log(e)
        }
        return sum[0]["SUM(value)"]
    }

    return {
        insertItem,
        updateItem,
        getItems,
        deleteItem,
        deleteByGroup,
        getIncomes,
        getExpenses
    }

}

export default itemsHandler