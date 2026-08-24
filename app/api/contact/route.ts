import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const name    = formData.get("name")    as string;
    const email   = formData.get("email")   as string;
    const phone   = formData.get("phone")   as string | null;
    const message = formData.get("message") as string;
    const file    = formData.get("attachment") as File | null;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    // Build attachment array for nodemailer
    const attachments: nodemailer.SendMailOptions["attachments"] = [];
    if (file && file.size > 0) {
      const buffer = Buffer.from(await file.arrayBuffer());
      attachments.push({ filename: file.name, content: buffer });
    }

    await transporter.sendMail({
      from: `"Ocean Arms Website" <${process.env.GMAIL_USER}>`,
      to: process.env.CONTACT_TO_EMAIL,
      replyTo: email,
      subject: `New enquiry from ${name}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#1a1a2e">
          <div style="background:#1a2744;padding:28px 32px;border-radius:8px 8px 0 0">
            <h1 style="margin:0;color:#fff;font-size:20px;font-weight:600">New Contact Enquiry</h1>
            <p style="margin:6px 0 0;color:rgba(255,255,255,0.55);font-size:13px">Ocean Arms Technical Services LLC</p>
          </div>
          <div style="background:#f8f9fb;padding:28px 32px;border-radius:0 0 8px 8px;border:1px solid #e5e7eb;border-top:none">
            <table style="width:100%;border-collapse:collapse">
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #e5e7eb;font-size:13px;color:#6b7280;width:120px;vertical-align:top">Name</td>
                <td style="padding:10px 0;border-bottom:1px solid #e5e7eb;font-size:14px;color:#111827;font-weight:500">${name}</td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #e5e7eb;font-size:13px;color:#6b7280;vertical-align:top">Email</td>
                <td style="padding:10px 0;border-bottom:1px solid #e5e7eb;font-size:14px;color:#111827;font-weight:500">
                  <a href="mailto:${email}" style="color:#2563eb;text-decoration:none">${email}</a>
                </td>
              </tr>
              ${phone ? `
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #e5e7eb;font-size:13px;color:#6b7280;vertical-align:top">Phone</td>
                <td style="padding:10px 0;border-bottom:1px solid #e5e7eb;font-size:14px;color:#111827;font-weight:500">
                  <a href="tel:${phone}" style="color:#2563eb;text-decoration:none">${phone}</a>
                </td>
              </tr>` : ""}
              <tr>
                <td style="padding:10px 0;font-size:13px;color:#6b7280;vertical-align:top">Message</td>
                <td style="padding:10px 0;font-size:14px;color:#111827;line-height:1.6;white-space:pre-wrap">${message}</td>
              </tr>
            </table>
            ${file && file.size > 0 ? `<p style="margin:16px 0 0;font-size:12px;color:#9ca3af">📎 Attachment: ${file.name}</p>` : ""}
          </div>
          <p style="margin:16px 0 0;font-size:11px;color:#9ca3af;text-align:center">
            Sent via oceanarms.ae contact form · Reply directly to this email to respond to ${name}
          </p>
        </div>
      `,
      attachments,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[contact/route] send error:", err);
    return NextResponse.json({ error: "Failed to send message. Please try again." }, { status: 500 });
  }
}
