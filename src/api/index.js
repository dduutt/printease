import db from "./db.js";

async function remoteTemplateIndexData(templateName = "", query = "") {
    const result = await db.select("SELECT * FROM $1 WHERE indexData LIKE $2", [templateName, query]);
    console.log(result);
    return result;
}
