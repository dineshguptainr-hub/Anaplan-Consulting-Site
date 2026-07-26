// Paste this into Extensions -> Apps Script for the target Google Sheet,
// then deploy as a Web App (Execute as: Me, Access: Anyone).
// Not used by the Next.js build -- kept here so the deployed script has a
// reviewable source of truth.
//
// SECURITY -- why the secret check below exists:
// "Access: Anyone" means the deployment URL is the only thing standing between
// the public internet and this Sheet, so the URL must not be sufficient on its
// own to write a row. A URL leaks easily (it once sat in .env.local.example in
// a public repo, and scrubbing the file did not revoke it). Every request must
// therefore also carry a shared secret:
//
//   1. Project Settings -> Script properties -> add WEBHOOK_SECRET
//      (a long random string).
//   2. Set the same value as CONTACT_WEBHOOK_SECRET in Vercel.
//
// This fails CLOSED: if WEBHOOK_SECRET is unset, every request is refused.
// Set the script property BEFORE deploying this version or the live form will
// start erroring.

function doPost(e) {
  var expected = PropertiesService.getScriptProperties()
    .getProperty("WEBHOOK_SECRET");

  var data;
  try {
    data = e && e.postData ? JSON.parse(e.postData.contents) : {};
  } catch (err) {
    return jsonOutput({ ok: false, error: "bad_request" });
  }

  // An unset property is a misconfiguration, not permission to write.
  if (!expected || data.secret !== expected) {
    return jsonOutput({ ok: false, error: "unauthorized" });
  }

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  sheet.appendRow([
    data.submittedAt || new Date().toISOString(),
    data.name || "",
    data.email || "",
    data.tool || "",
    data.painPoint || "",
  ]);

  return jsonOutput({ ok: true });
}

// Web Apps always answer 200, so the outcome has to travel in the body -- the
// caller in app/api/contact/route.ts checks `ok`, not the HTTP status.
function jsonOutput(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
