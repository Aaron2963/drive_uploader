const readlineSync = require("readline-sync");
const { authorize } = require("./src/authorize.js");
const { uploadFiles } = require("./src/upload-files.js");
const { AppSettings } = require("./src/app-settings.js");

async function doUpload() {
  const client = await authorize();
  let settings = new AppSettings();
  while (settings.isEmpty) {
    console.log("\n[WARN] Please configure settings first\n");
    doSettings();
    settings = new AppSettings();
  }
  await uploadFiles(client, settings);
}

async function doAuthorize() {
  await authorize();
}

async function doSettings() {
  const settings = new AppSettings();
  console.log("Source folder path: ", settings.sourceFolderPath);
  console.log("Parent folder ID: ", settings.parentFolderId);
  const toEdit = readlineSync.question("Edit settings? (y/N): ");
  if (toEdit.toLowerCase() !== "y") return;
  let loop = true;
  while (loop) {
    let sourceFolderPath = readlineSync.question("Enter source folder path on local machine: ");
    sourceFolderPath = sourceFolderPath.trim();
    if (sourceFolderPath.length > 0) {
      settings.set("sourceFolderPath", sourceFolderPath);
      loop = false;
    } else if (
      !settings.sourceFolderPath ||
      settings.sourceFolderPath.length === 0
    ) {
      console.log("Source folder path cannot be empty");
    } else {
      loop = false;
    }
  }
  loop = true;
  while (loop) {
    let parentFolderId = readlineSync.question("Enter parent Google Drive folder ID: ");
    parentFolderId = parentFolderId.trim();
    if (parentFolderId.length > 0) {
      settings.set("parentFolderId", parentFolderId);
      loop = false;
    } else if (!settings.parentFolderId || settings.parentFolderId.length === 0) {
      console.log("Parent folder ID cannot be empty");
    } else {
      loop = false;
    }
  }
}

async function main() {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    await doUpload();
    return;
  }
  if (args.length === 1 && args[0] === "authorize") {
    await doAuthorize();
    return;
  }
  if (args.length === 1 && args[0] === "settings") {
    await doSettings();
    return;
  }
}

main();
