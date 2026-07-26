import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (
    !body ||
    typeof body.name !== "string" ||
    typeof body.email !== "string" ||
    typeof body.tool !== "string" ||
    typeof body.painPoint !== "string"
  ) {
    return NextResponse.json({ error: "Invalid submission." }, { status: 400 });
  }

  // GOOGLE_SHEETS_WEBHOOK_URL is canonical; the plural spelling is accepted
  // because that is how the variable is currently named in Vercel.
  const webhookUrl =
    process.env.GOOGLE_SHEETS_WEBHOOK_URL ??
    process.env.GOOGLE_SHEETS_WEBHOOKS_URL;
  if (!webhookUrl) {
    console.error(
      "Neither GOOGLE_SHEETS_WEBHOOK_URL nor GOOGLE_SHEETS_WEBHOOKS_URL is configured.",
    );
    return NextResponse.json(
      { error: "Form is not configured yet." },
      { status: 500 },
    );
  }

  // Shared secret proving the caller is this server, not anyone who found the
  // deployment URL. The Apps Script rejects requests without it, so a leaked
  // URL is not enough to write to the Sheet. See
  // scripts/google-apps-script-webhook.gs.
  const webhookSecret = process.env.CONTACT_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.warn(
      "CONTACT_WEBHOOK_SECRET is not set — the Apps Script will reject this submission.",
    );
  }

  const sheetResponse = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      secret: webhookSecret,
      name: body.name,
      email: body.email,
      tool: body.tool,
      painPoint: body.painPoint,
      submittedAt: new Date().toISOString(),
    }),
  });

  // Apps Script Web Apps answer 200 even when they refuse the write, so the
  // status alone proves nothing — the outcome is in the JSON body.
  const sheetBody = await sheetResponse.text();
  let sheetResult: { ok?: boolean; error?: string } | null = null;
  try {
    sheetResult = JSON.parse(sheetBody);
  } catch {
    sheetResult = null;
  }

  if (!sheetResponse.ok || sheetResult?.ok !== true) {
    console.error("Google Sheets webhook failed:", sheetBody.slice(0, 500));
    return NextResponse.json(
      { error: "Could not record submission." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
