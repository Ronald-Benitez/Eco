import { SQLiteStatement, useSQLiteContext } from "expo-sqlite/next";

import { Group, BasicGroup } from "@/src/interfaces/finances";

export interface GroupsHandler {}
export type GroupTable = "registerGroup" | "savingsGroup";

interface GroupsHandlerProps {
  table: GroupTable;
}

const groupsHandler = ({ table }: GroupsHandlerProps) => {
  const db = useSQLiteContext();

  const insertGroup = async (group: BasicGroup) => {
    let isInserted = false;
    try {
      await db.runAsync(
        `INSERT INTO ${table} (name, month, year, expenses, incomes, goal) VALUES (?,?,?,?,?,?)`,
        group.name,
        group.month,
        group.year,
        group.expenses,
        group.incomes,
        group.goal
      );
      isInserted = true;
    } catch (e) {
      console.log(e);
    }
    return isInserted;
  };

  const updateGroup = async (group: Group) => {
    let isUpdated = false;
    try {
      await db.runAsync(
        `UPDATE ${table} SET name = ?, month = ?, year = ?, expenses = ?, incomes = ?, goal = ? WHERE id = ?`,
        group.name,
        group.month,
        group.year,
        group.expenses,
        group.incomes,
        group.goal,
        group.id
      );
      isUpdated = true;
    } catch (e) {
      console.log(e);
    }
    return isUpdated;
  };

  const deleteGroup = async (id: number) => {
    let isDeleted = false;
    try {
      await db.runAsync(`DELETE FROM ${table} WHERE id = ?`, id);
      isDeleted = true;
    } catch (e) {
      console.log(e);
    }
    return isDeleted;
  };

  const getGroups = async () => {
    let groups: Group[] = [];
    try {
      groups = await db.getAllAsync(`SELECT * FROM ${table}`);
    } catch (e) {
      console.log(e);
    }
    return groups;
  };

  const getGroupsByYear = async (year: string) => {
    let groups: Group[] = [];
    try {
      groups = await db.getAllAsync(
        `SELECT * FROM ${table} WHERE year = ?`,
        year
      );
    } catch (e) {
      console.log(e);
    }
    return groups;
  };

  const getGroup = async (id: number) => {
    let group: Group | null = null;
    try {
      group = await db.getFirstAsync(`SELECT * FROM ${table} WHERE id = ?`, id);
    } catch (e) {
      console.log(e);
    }
    return group;
  };

  const getLastGroup = async () => {
    let group: Group | null = null;
    try {
      group = await db.getFirstAsync(
        `SELECT * FROM ${table} ORDER BY id DESC LIMIT 1`
      );
    } catch (e) {
      console.log(e);
    }
    return group;
  };

  return {
    insertGroup,
    updateGroup,
    deleteGroup,
    getGroups,
    getGroupsByYear,
    getGroup,
    getLastGroup,
  };
};

export default groupsHandler;
