import { GoogleAuth } from "google-auth-library"
import { GoogleSpreadsheet } from "google-spreadsheet"

const scopes = ["https://www.googleapis.com/auth/spreadsheets"]

async function loadSpreadsheets() {
  try {
    const { privateKey } = JSON.parse(
      process.env.GOOGLE_PRIVATE_KEY || "{ privateKey: null }"
    )

    const private_key = privateKey.replace(/\\n/g, "\n")

    const auth = new GoogleAuth({
      scopes,
      projectId: process.env.GOOGLE_PROJECT_ID,
      credentials: {
        private_key,
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      },
    })

    const serviceAccountAuth = await auth.getClient()

    const doc = new GoogleSpreadsheet(
      process.env.GOOGLE_DOCUMENT_ID || "",
      serviceAccountAuth
    )

    await doc.loadInfo()

    return doc
  } catch (error) {
    console.log(error)
  }
}

export { loadSpreadsheets }
