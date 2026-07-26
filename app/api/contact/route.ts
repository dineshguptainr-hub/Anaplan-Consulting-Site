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

  const sheetResponse = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: body.name,
      email: body.email,
      tool: body.tool,
      painPoint: body.painPoint,
      submittedAt: new Date().toISOString(),
    }),
  });

  if (!sheetResponse.ok) {
    console.error("Google Sheets webhook failed:", await sheetResponse.text());
    return NextResponse.json(
      { error: "Could not record submission." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
