const fs = require('fs');
const path = require('path');
const process = require('process');
const {authorize} = require('./authorize.js');
const {google} = require('googleapis');

async function uploadFiles(client) {
  const drive = google.drive({version: 'v3', auth: client});
  const dir = path.join(process.cwd(), 'to-upload');
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const fileMetadata = {
      name: file,
      parents: ['1TjsYFF_TmKHx8mkhnCt9I-3YJcGY5D2A'],
    };
    const media = {
      mimeType: 'text/csv',
      body: fs.createReadStream(filePath),
    };
    const res = drive.files.create({
      resource: fileMetadata,
      media: media,
      fields: 'id',
    });
    console.log(res.data);
  }
}

async function main() {
  const client = await authorize();
  await uploadFiles(client);
}

main();