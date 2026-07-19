// Paste this into Extensions -> Apps Script for the target Google Sheet,
// then deploy as a Web App (Execute as: Me, Access: Anyone).
// Not used by the Next.js build -- kept here for reference/history only.

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);

  sheet.appendRow([
    data.submittedAt || new Date().toISOString(),
    data.name || "",
    data.email || "",
    data.tool || "",
    data.painPoint || "",
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
