const fs = require('fs');
const path = require('path');
const process = require('process');
const {authorize} = require('./authorize.js');
const {google} = require('googleapis');

async function uploadFiles(client, settings) {
  const drive = google.drive({version: 'v3', auth: client});
  const dir = path.join(process.cwd(), 'to-upload');
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (!file.endsWith('.csv')) continue;
    const filePath = path.join(dir, file);
    const fileMetadata = {
      name: file,
      parents: [settings.parentFolderId],
    };
    const media = {
      mimeType: 'text/csv',
      body: fs.createReadStream(filePath),
    };
    const res = await drive.files.create({
      resource: fileMetadata,
      media: media,
      fields: 'id',
    });
    if (!res.data.id) throw new Error('Failed to upload file');
    console.log('Uploaded file %s with ID: %s', file, res.data.id);
  }
}

async function main() {
  const client = await authorize();
  const settingsPath = path.join(process.cwd(), 'settings.json');
  const settings = JSON.parse(fs.readFileSync(settingsPath));
  await uploadFiles(client, settings);
}

main();