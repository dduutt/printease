import { open } from "@tauri-apps/plugin-dialog";

async function getSelectedFile(name = "", ext = []) {
  const path = await open({
    multiple: false,
    defaultPath: "",
    title: "选择模板文件",
    filters: [
      {
        name: name,
        extensions: ext,
      },
    ],
  });
  return path;
}

export { getSelectedFile };
