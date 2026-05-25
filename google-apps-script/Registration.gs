/**
 * DTW 2026 — Registration → Google Sheet
 *
 * Setup:
 * 1. Create a Google Sheet (e.g. "DTW 2026 Registrations")
 * 2. Extensions → Apps Script → paste this file → Save
 * 3. Run setupSheet once (authorize when prompted)
 * 4. Deploy → New deployment → Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 5. Copy the Web app URL into VITE_REGISTRATION_SCRIPT_URL
 */

const SHEET_NAME = "Registrations";

function setupSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }

  const headers = [
    "Timestamp",
    "Name",
    "Email",
    "Organization",
    "Position",
    "Country",
    "Events",
  ];

  const headerRange = sheet.getRange(1, 1, 1, headers.length);
  const existing = headerRange.getValues()[0];

  if (existing[0] !== "Timestamp") {
    headerRange.setValues([headers]);
    headerRange.setFontWeight("bold");
    headerRange.setBackground("#FEF9C3");
    sheet.setFrozenRows(1);
  }
}

function doGet() {
  return ContentService.createTextOutput(
    JSON.stringify({ ok: true, message: "DTW registration endpoint is active." })
  ).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    setupSheet();

    if (!e.postData || !e.postData.contents) {
      throw new Error("No data received");
    }

    const data = JSON.parse(e.postData.contents);

    const name = String(data.name || "").trim();
    const email = String(data.email || "").trim();
    const organization = String(data.organization || "").trim();
    const position = String(data.position || "").trim();
    const country = String(data.country || "").trim();
    const events = Array.isArray(data.events)
      ? data.events.map(String).join(", ")
      : String(data.events || "").trim();

    if (!name || !email || !organization || !position || !country || !events) {
      throw new Error("Missing required fields");
    }

    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    sheet.appendRow([
      new Date(),
      name,
      email,
      organization,
      position,
      country,
      events,
    ]);

    return ContentService.createTextOutput(
      JSON.stringify({ success: true })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    const message = err && err.message ? err.message : String(err);
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, error: message })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
