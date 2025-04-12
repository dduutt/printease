import Database from "@tauri-apps/plugin-sql";
const db = await Database.load("sqlite:test.db");

async function createTemplatsTable() {
  const r = await db.execute(
    `CREATE TABLE IF NOT EXISTS templates (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE,
        path TEXT NOT NULL,
        description TEXT
        )`
  );
  return r;
}

async function createTable() {
  createTemplatsTable();
}
console.log("createTable", createTable());

export default db;
