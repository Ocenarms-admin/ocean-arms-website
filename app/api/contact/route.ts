import { NextRequest, NextResponse } from "next/server";

const SENDER_MAILBOX = "a.prakasan@oceanarms.ae";
const INBOX = "support@oceanarms.ae";
const fromAddress = process.env.MAIL_FROM || SENDER_MAILBOX;
const toAddress = process.env.CONTACT_TO_EMAIL || INBOX;
const tenantId = process.env.MICROSOFT_TENANT_ID;
const clientId = process.env.MICROSOFT_CLIENT_ID;
const clientSecret = process.env.MICROSOFT_CLIENT_SECRET;

const MAX_ATTACHMENT_BYTES = 3 * 1024 * 1024;

type GraphAttachment = {
  "@odata.type": "#microsoft.graph.fileAttachment";
  name: string;
  contentBytes: string;
  contentType?: string;
};

type GraphMessage = {
  subject: string;
  body: { contentType: "HTML"; content: string };
  toRecipients: Array<{ emailAddress: { address: string } }>;
  replyTo?: Array<{ emailAddress: { address: string } }>;
  attachments?: GraphAttachment[];
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

async function getGraphToken() {
  if (!tenantId || !clientId || !clientSecret) {
    throw new Error("Microsoft Graph is not configured.");
  }

  const res = await fetch(
    `https://login.microsoftonline.com/${encodeURIComponent(tenantId)}/oauth2/v2.0/token`,
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        scope: "https://graph.microsoft.com/.default",
        grant_type: "client_credentials",
      }),
    },
  );

  const data = (await res.json()) as {
    access_token?: string;
    error?: string;
    error_description?: string;
  };

  if (!res.ok || !data.access_token) {
    throw new Error(data.error_description || data.error || `Token request failed (${res.status})`);
  }

  return data.access_token;
}

async function sendGraphMail(token: string, message: GraphMessage, saveToSentItems: boolean) {
  const sendRes = await fetch(
    `https://graph.microsoft.com/v1.0/users/${encodeURIComponent(fromAddress)}/sendMail`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message, saveToSentItems }),
    },
  );

  if (!sendRes.ok) {
    const errBody = (await sendRes.json().catch(() => null)) as {
      error?: { code?: string; message?: string };
    } | null;
    console.error("[contact/route] Graph send error:", sendRes.status, errBody?.error);
    throw new Error(errBody?.error?.code || `Graph send failed (${sendRes.status})`);
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string | null;
    const message = formData.get("message") as string;
    const file = formData.get("attachment") as File | null;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    if (!tenantId || !clientId || !clientSecret) {
      console.error("[contact/route] missing Microsoft Graph credentials");
      return NextResponse.json({ error: "Mail is not configured." }, { status: 500 });
    }

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safePhone = phone ? escapeHtml(phone) : "";
    const safeMessage = escapeHtml(message);

    const attachments: GraphAttachment[] = [];

    if (file && file.size > 0) {
      if (file.size > MAX_ATTACHMENT_BYTES) {
        return NextResponse.json({ error: "Attachment must be 3 MB or smaller." }, { status: 400 });
      }
      const buffer = Buffer.from(await file.arrayBuffer());
      attachments.push({
        "@odata.type": "#microsoft.graph.fileAttachment",
        name: file.name,
        contentBytes: buffer.toString("base64"),
        contentType: file.type || undefined,
      });
    }

    const token = await getGraphToken();

    await sendGraphMail(
      token,
      {
        subject: `New enquiry from ${name}`,
        body: {
          contentType: "HTML",
          content: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#1a1a2e">
          <div style="background:#1a2744;padding:28px 32px;border-radius:8px 8px 0 0">
            <h1 style="margin:0;color:#fff;font-size:20px;font-weight:600">New Contact Enquiry</h1>
            <p style="margin:6px 0 0;color:rgba(255,255,255,0.55);font-size:13px">Ocean Arms Technical Services LLC</p>
          </div>
          <div style="background:#f8f9fb;padding:28px 32px;border-radius:0 0 8px 8px;border:1px solid #e5e7eb;border-top:none">
            <table style="width:100%;border-collapse:collapse">
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #e5e7eb;font-size:13px;color:#6b7280;width:120px;vertical-align:top">Name</td>
                <td style="padding:10px 0;border-bottom:1px solid #e5e7eb;font-size:14px;color:#111827;font-weight:500">${safeName}</td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #e5e7eb;font-size:13px;color:#6b7280;vertical-align:top">Email</td>
                <td style="padding:10px 0;border-bottom:1px solid #e5e7eb;font-size:14px;color:#111827;font-weight:500">
                  <a href="mailto:${safeEmail}" style="color:#2563eb;text-decoration:none">${safeEmail}</a>
                </td>
              </tr>
              ${
                safePhone
                  ? `
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #e5e7eb;font-size:13px;color:#6b7280;vertical-align:top">Phone</td>
                <td style="padding:10px 0;border-bottom:1px solid #e5e7eb;font-size:14px;color:#111827;font-weight:500">
                  <a href="tel:${safePhone}" style="color:#2563eb;text-decoration:none">${safePhone}</a>
                </td>
              </tr>`
                  : ""
              }
              <tr>
                <td style="padding:10px 0;font-size:13px;color:#6b7280;vertical-align:top">Message</td>
                <td style="padding:10px 0;font-size:14px;color:#111827;line-height:1.6;white-space:pre-wrap">${safeMessage}</td>
              </tr>
            </table>
            ${file && file.size > 0 ? `<p style="margin:16px 0 0;font-size:12px;color:#9ca3af">Attachment: ${escapeHtml(file.name)}</p>` : ""}
          </div>
          <p style="margin:16px 0 0;font-size:11px;color:#9ca3af;text-align:center">
            Sent via oceanarms.ae contact form · Reply directly to this email to respond to ${safeName}
          </p>
        </div>
      `,
        },
        toRecipients: [{ emailAddress: { address: toAddress } }],
        replyTo: [{ emailAddress: { address: email } }],
        attachments,
      },
      true,
    );

    await sendGraphMail(
      token,
      {
        subject: "Thank you for contacting Ocean Arms",
        body: {
          contentType: "HTML",
          content: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#1a1a2e">
          <div style="background:#1a2744;padding:28px 32px;border-radius:8px 8px 0 0">
            <h1 style="margin:0;color:#fff;font-size:20px;font-weight:600">Thank you for contacting us</h1>
            <p style="margin:6px 0 0;color:rgba(255,255,255,0.55);font-size:13px">Ocean Arms Technical Services LLC</p>
          </div>
          <div style="background:#f8f9fb;padding:28px 32px;border-radius:0 0 8px 8px;border:1px solid #e5e7eb;border-top:none">
            <p style="margin:0 0 16px;font-size:15px;color:#111827;line-height:1.6">Dear ${safeName},</p>
            <p style="margin:0 0 16px;font-size:15px;color:#111827;line-height:1.6">
              Thank you for contacting us. We have received your enquiry and will get back to you shortly.
            </p>
            <p style="margin:0;font-size:15px;color:#111827;line-height:1.6">
              Kind regards,<br />
              Ocean Arms Technical Services LLC
            </p>
          </div>
          <p style="margin:16px 0 0;font-size:11px;color:#9ca3af;text-align:center">
            This is an automated confirmation from oceanarms.ae
          </p>
        </div>
      `,
        },
        toRecipients: [{ emailAddress: { address: email } }],
        replyTo: [{ emailAddress: { address: toAddress } }],
      },
      false,
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[contact/route] send error:", err);
    return NextResponse.json({ error: "Failed to send message. Please try again." }, { status: 500 });
  }
}
