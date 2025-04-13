import db from "./db.js";
import { withMessage } from "./index.js";

export const templateAPI = {
  add,
  update,
  getList,
  getByName,
};

async function add(template) {
  const { name, path, description = "", inUse = 1 } = template;
  const sql = `INSERT INTO templates (name, path, description, inUse) VALUES ($1, $2, $3, $4)`;
  const params = [name, path, description, inUse];
  const result = await withMessage({
    successMessage: "模板添加成功",
    errorMessage: "模板添加失败",
    f: async () => {
      return await db.execute(sql, params);
    },
  });
  return result;
}

async function getByName(name) {
  const result = await db.select("SELECT * FROM templates WHERE name = $1", [
    name,
  ]);
  return result;
}

async function update(template) {
  const { id, name, path, description, inUse } = template;

  const sql = `UPDATE templates SET name = $1, path = $2, description = $3, inUse = $4 WHERE id = $5`;
  const params = [name, path, description, inUse, id];
  const result = await withMessage({
    successMessage: "模板更新成功",
    errorMessage: "模板更新失败",
    f: async () => {
      return await db.execute(sql, params);
    },
  });
  return result;
}

async function getList(searchText = "", currentPage = 1, pageSize = 10) {
  const offset = (currentPage - 1) * pageSize;
  const sql =
    "SELECT *,COUNT(*) OVER() AS totalCount FROM templates WHERE name LIKE $1 ORDER BY id DESC LIMIT $2 OFFSET $3";
  const params = [`%${searchText}%`, pageSize, offset];
  const result = await withMessage({
    successMessage: "获取模板列表成功",
    errorMessage: "获取模板列表失败",
    f: async () => {
      const r = await db.select(sql, params);
      return r;
    },
  });
  const total = result.data[0]?.totalCount || 0;
  const templates = result.data;
  return {
    data: {
      list: templates,
      total: total,
    },
    status: result.status,
  };
}
