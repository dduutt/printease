import Database from "@tauri-apps/plugin-sql";
import { resolve } from "@tauri-apps/api/path";
const basePath = await resolve("..");

const DEV_DBURL = `sqlite:${basePath}\\printease.db`;
const PRD_DBURL = `sqlite:printease.db`;
const DBURL = process.env.NODE_ENV === "development" ? DEV_DBURL : PRD_DBURL;
const db = await Database.load(DBURL);


async function createTemplatsTable() {
  const r = await db.execute(
    `CREATE TABLE IF NOT EXISTS templates (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE,
        path TEXT NOT NULL,
        description TEXT,
        inUse INTEGER DEFAULT 0,
        createdAt TIMESTAMP DEFAULT (DATETIME('NOW', 'LOCALTIME')),
        updatedAt TIMESTAMP DEFAULT (DATETIME('NOW', 'LOCALTIME'))
        )`
  );
  return r;
}

async function createTable() {
  createTemplatsTable();
}
console.log("createTable", createTable());

export default db;
