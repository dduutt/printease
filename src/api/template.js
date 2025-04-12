import { ElMessage } from "element-plus";
import db from "./db.js";


export const templateAPI = {
  add,
  get,
};

async function add(name, path, description) {
  const template = await get(name);
  if (template.length > 0) {
    ElMessage({
      message: "模板已存在",
      type: "error",
    });
    return {
      data: "",
      message: "模板已存在",
      status: false,
      error: "Template already exists",
    };
  }
  const result = await db.execute(
    "INSERT INTO templates (name, path,description) VALUES ($1,$2,$3)",
    [name, path, description]
  );
  console.log(result);
  ElMessage({
    message: "模板添加成功",
    type: "success",
  });
}

async function get(name) {
  const result = await db.select("SELECT * FROM templates WHERE name = $1", [
    name,
  ]);
  return result;
}

