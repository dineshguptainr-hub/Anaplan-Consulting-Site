// Paste this into Extensions -> Apps Script for the target Google Sheet,
// then deploy as a Web App (Execute as: Me, Access: Anyone).
// Not used by the Next.js build -- kept here so the deployed script has a
// reviewable source of truth.
//
// SECURITY -- why this verifies a Turnstile token rather than a shared secret:
//
// The site is a static export on IONOS shared hosting, so there is no server
// to keep a secret on. Anything the browser sends is public, which rules out
// the shared-secret scheme this script used previously: a secret shipped in a
// JavaScript bundle is not a secret.
//
// So the browser instead proves it solved a Cloudflare Turnstile challenge,
// and THIS script -- which does have somewhere private to keep a key --
// verifies that proof with Cloudflare before writing anything. The Turnstile
// site key in the page is public by design; the secret key never leaves here.
//
//   1. Cloudflare dashboard -> Turnstile -> add a widget for epmjourney.com.
//   2. Project Settings -> Script properties -> add TURNSTILE_SECRET
//      (the widget's Secret Key).
//   3. Put the widget's Site Key in NEXT_PUBLIC_TURNSTILE_SITE_KEY at build.
//
// This fails CLOSED: if TURNSTILE_SECRET is unset, every request is refused.
// Set the script property BEFORE deploying this version or the live form will
// start erroring.

var VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

// Caps on what gets written to the Sheet. A verified human can still paste a
// megabyte of text; there is no reason to store it.
var MAX_LENGTHS = { name: 120, email: 200, tool: 60, painPoint: 4000 };

function doPost(e) {
  var secret = PropertiesService.getScriptProperties()
    .getProperty("TURNSTILE_SECRET");

  // An unset property is a misconfiguration, not permission to write.
  if (!secret) {
    return jsonOutput({ ok: false, error: "not_configured" });
  }

  var data;
  try {
    data = e && e.postData ? JSON.parse(e.postData.contents) : {};
  } catch (err) {
    return jsonOutput({ ok: false, error: "bad_request" });
  }

  if (!data.turnstileToken) {
    return jsonOutput({ ok: false, error: "missing_token" });
  }

  if (!verifyTurnstile(secret, data.turnstileToken)) {
    return jsonOutput({ ok: false, error: "failed_challenge" });
  }

  // Only reached once Cloudflare has confirmed the token. Validate the shape
  // of the submission separately -- passing the challenge says the caller is
  // human, not that they sent a usable enquiry.
  if (!data.name || !data.email || !data.tool || !data.painPoint) {
    return jsonOutput({ ok: false, error: "missing_fields" });
  }

  SpreadsheetApp.getActiveSpreadsheet().getActiveSheet().appendRow([
    data.submittedAt || new Date().toISOString(),
    clamp(data.name, MAX_LENGTHS.name),
    clamp(data.email, MAX_LENGTHS.email),
    clamp(data.tool, MAX_LENGTHS.tool),
    clamp(data.painPoint, MAX_LENGTHS.painPoint),
  ]);

  return jsonOutput({ ok: true });
}

// Cloudflare answers { success: true|false, ... }. Any transport failure or
// unparseable response counts as a failed challenge, never as a pass.
function verifyTurnstile(secret, token) {
  try {
    var response = UrlFetchApp.fetch(VERIFY_URL, {
      method: "post",
      payload: { secret: secret, response: token },
      muteHttpExceptions: true,
    });
    return JSON.parse(response.getContentText()).success === true;
  } catch (err) {
    return false;
  }
}

function clamp(value, max) {
  return String(value == null ? "" : value).slice(0, max);
}

// Web Apps always answer 200, so the outcome has to travel in the body -- the
// caller in components/ContactForm.tsx checks `ok`, not the HTTP status.
function jsonOutput(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
