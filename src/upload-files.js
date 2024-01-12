const fs = require('fs');
const path = require('path');
const {google} = require('googleapis');

async function uploadFiles(client, settings) {
  const drive = google.drive({version: 'v3', auth: client});
  const files = fs.readdirSync(settings.sourceFolderPath);
  for (const file of files) {
    const filePath = path.join(settings.sourceFolderPath, file);
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
    console.log(`[INFO] Uploaded file ${file} with ID: ${res.data.id} to https://drive.google.com/drive/folders/${settings.parentFolderId}`);
  }
}

module.exports = {
  uploadFiles,
};