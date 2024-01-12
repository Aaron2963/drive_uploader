const fs = require("fs").promises;
const path = require("path");
const process = require("process");
const { authenticate } = require("@google-cloud/local-auth");
const { Auth, google } = require("googleapis");

// If modifying these scopes, delete token.json.
const SCOPES = ["https://www.googleapis.com/auth/drive.file"];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const CREDENTIALS_PATH = path.join(process.cwd(), "credentials.json");

/**
 * Load or request or authorization to call APIs.
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
