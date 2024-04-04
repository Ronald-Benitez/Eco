import { SQLiteStatement, useSQLiteContext } from "expo-sqlite/next";

import { Day } from "@/src/interfaces/day";

type Field = "expected" | "real" | "difference";

export interface DaysHandler {
  insertDay: (day: Day) => Promise<boolean>;
  updateDay: (day: Day) => Promise<boolean>;
  updateField: (date: string, value: string, field: Field) => Promise<boolean>;
  getDay: (date: string) => Promise<Day>;
  getMonth: (date: string) => Promise<Day[]>;
  clean: () => Promise<void>;
}

const daysHandler = () => {
  const db = useSQLiteContext();

  const insertDay = async (day: Day) => {
    let isInserted = false;
    try {
      await db.runAsync(
        `INSERT OR REPLACE INTO days (date, expected, real, difference) VALUES (?,?,?,?)`,
        day.date,
        day.expected,
        day.real,
        day.difference
      );
      isInserted = true;
    } catch (e) {
      console.log(e);
    }
    return isInserted;
  };

  const updateDay = async (day: Day) => {
    let isUpdated = false;
    try {
      await db.runAsync(
        `UPDATE days SET expected = ?, real = ?, difference = ? WHERE date = ?`,
        day.expected,
        day.real,
        day.difference,
        day.date
      );
      isUpdated = true;
    } catch (e) {
      console.log(e);
    }
    return isUpdated;
  };

  const updateField = async (date: string, value: string, field: Field) => {
    let isUpdated = false;
    let query: SQLiteStatement;
    console.log("date: ", date, value, field);
    switch (field) {
      case "expected":
        query = await db.prepareAsync(
          `UPDATE days SET expected = $value WHERE date = $date`
        );
        break;
      case "real":
        query = await db.prepareAsync(
          `UPDATE days SET real = $value WHERE date = $date`
        );
        break;
      case "difference":
        query = await db.prepareAsync(
          `UPDATE days SET difference = $value WHERE date = $date`
        );
        break;
    }

    try {
      await query.executeAsync({ $value: value, $date: date });
      isUpdated = true;
    } catch (e) {
      console.log(e);
    }
    return isUpdated;
  };

  const getDay = async (date: string) => {
    const d = date.split("T")[0];
    const res = await db.getAllAsync(`SELECT * FROM days WHERE date = '${d}'`);
    return res[0] as Day;
  };

  const getMonth = async (date: string) => {
    const replaced = date.split("/");
    const values = replaced.map((v) => parseInt(v));
    const startDate = new Date(values[0], values[1] - 1, 1);
    const endDate = new Date(values[0], values[1], 0);
    const start = startDate.toISOString().split("T")[0].replaceAll("-", "/");
    const end = endDate.toISOString().split("T")[0].replaceAll("-", "/");
    // console.log("start: ", start, "end: ", end);
    const res = await db.getAllAsync(
      `SELECT * FROM days WHERE date BETWEEN '${start}' AND '${end}'`
    );
    return res as Day[];
  };

  const clean = async () => {
    await db.execAsync(`DELETE FROM days`);
  };

  return { insertDay, updateDay, updateField, getDay, getMonth, clean };
};

export default daysHandler;
