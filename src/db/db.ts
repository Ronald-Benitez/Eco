import { SQLiteDatabase } from "expo-sqlite/next";

export async function openDatabase(db: SQLiteDatabase) {
  db.withTransactionAsync(async () => {
    await db.execAsync(`
            CREATE TABLE IF NOT EXISTS days (
                date TEXT PRIMARY KEY NOT NULL,
                expected TEXT,
                real TEXT ,
                difference TEXT
            );
        `);
    await db.execAsync(`
        CREATE TABLE IF NOT EXISTS registerGroup (
          id INTEGER PRIMARY KEY NOT NULL, 
          name TEXT, 
          month TEXT, 
          year TEXT, 
          expenses REAL, 
          incomes REAL, 
          goal REAL
          );
        `);
    await db.execAsync(`
        CREATE TABLE IF NOT EXISTS savingsGroup (
          id INTEGER PRIMARY KEY NOT NULL, 
          name TEXT, 
          month TEXT, 
          year TEXT, 
          expenses REAL, 
          incomes REAL, 
          goal REAL
          );
        `);
  });
}
