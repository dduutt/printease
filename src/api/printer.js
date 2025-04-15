import { Command } from '@tauri-apps/plugin-shell';

export const printer = {
  list,
};

async function list() {
  let result = await Command.create("get-printers", [
    "Get-Printer | Select-Object Name | ConvertTo-Json",
  ]).execute();
  if (result.code === 0) {
    let data = JSON.parse(result.stdout);
    return data.map((item) => item.Name);
  }
  return [];
}
