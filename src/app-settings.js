const fs = require("fs");
const path = require("path");
const process = require("process");

class AppSettings {
  constructor() {
    this.settingsPath = path.join(process.cwd(), "settings.json");
    try {
      this.settings = JSON.parse(fs.readFileSync(this.settingsPath, "utf8"));
    } catch (err) {
      this.settings = {};
    }
  }

  get sourceFolderPath() {
    return this.settings.sourceFolderPath;
  }

  get parentFolderId() {
    return this.settings.parentFolderId;
  }

  get isEmpty() {
    return !this.settings.sourceFolderPath || !this.settings.parentFolderId;
  }

  get(key) {
    return this.settings[key];
  }

  set(key, value) {
    this.settings[key] = value;
    fs.writeFileSync(this.settingsPath, JSON.stringify(this.settings));
  }
}

module.exports = {
  AppSettings,
};
