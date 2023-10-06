import { JWT } from "google-auth-library"
import { GoogleSpreadsheet } from "google-spreadsheet"

async function loadSpreadsheets() {
  try {
    const formattedKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n")

    const serviceAccountAuth = new JWT({
      key: formattedKey,
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    })

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
