const path = require("path");
const process = require("process");
const { Auth } = require("googleapis");

const SCOPES = ["https://www.googleapis.com/auth/drive.file"];
const CREDENTIALS_PATH = path.join(process.cwd(), "credentials.json");

/**
 * Request authorization to call APIs.
 *
 */
async function authorize() {
  const auth = new Auth.GoogleAuth({
    keyFile: CREDENTIALS_PATH,
    scopes: SCOPES,
  });
  client = await auth.getClient();
  return client;
}

module.exports = {
  authorize,
};
