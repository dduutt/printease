import Database from "@tauri-apps/plugin-sql";




const DBURL = "sqlite:D:\\pro\\printease\\test.db";
const db = await Database.load(DBURL);

async function createTemplatsTable() {
  const r = await db.execute(
    `CREATE TABLE IF NOT EXISTS templates (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE,
        path TEXT NOT NULL,
        description TEXT,
        inUse INTEGER DEFAULT 0,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`
  );
  return r;
}

async function createTable() {
  createTemplatsTable();
}
console.log("createTable", createTable());

export default db;
