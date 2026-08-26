import sgMail from "@sendgrid/mail";
import { env } from "../config/env";
import type { CreatePackageInquiryBody } from "../schemas/packageInquirySchema";

let initialized = false;

function ensureMailConfigured() {
  if (!env.SENDGRID_API_KEY || !env.SENDGRID_FROM_EMAIL) {
    const error = new Error("SendGrid is not configured.");
    Object.assign(error, {
      statusCode: 503,
      code: "MAIL_NOT_CONFIGURED",
      publicMessage: "Sponsorship email is not configured yet. Please try again later.",
    });
    throw error;
  }

  if (!initialized) {
    sgMail.setApiKey(env.SENDGRID_API_KEY);
    initialized = true;
  }
}

export async function sendPackageInquiryEmail(payload: CreatePackageInquiryBody) {
  ensureMailConfigured();

  const packageName = payload.packageBadge?.trim() || "Sponsorship Package";
  const packageInvestment = [payload.packagePrice, payload.packageCurrency]
    .filter(Boolean)
    .join(" ")
    .trim();
  const message = payload.message?.trim() || "No additional message provided.";
  const subject = `New Sponsorship Inquiry - ${packageName}`;

  const lines = [
    "New DTW 2026 Sponsorship Inquiry",
    "",
    `Organization: ${payload.organizationName}`,
    `Contact Person: ${payload.contactPerson}`,
    `Email Address: ${payload.email}`,
    `Phone Number: ${payload.phone}`,
    `Interested Package: ${packageName}`,
    packageInvestment ? `Investment Level: ${packageInvestment}` : null,
    "",
    "Message from the prospective sponsor:",
    message,
    "",
    "Next step: reply directly to this email to continue the conversation.",
  ].filter(Boolean);

  try {
    const [response] = await sgMail.send({
      to: env.SPONSORSHIP_INBOXES,
      from: {
        email: env.SENDGRID_FROM_EMAIL as string,
        name: "DTW 2026 Sponsorship",
      },
      replyTo: {
        email: payload.email,
        name: payload.contactPerson,
      },
      subject,
      text: lines.join("\n"),
      html: `
        <div style="margin:0;padding:24px;background:#f4f0e7;font-family:Arial,sans-serif;color:#1a1a1a;">
          <div style="max-width:680px;margin:0 auto;background:#ffffff;border:1px solid #e7dfcf;">
            <div style="padding:28px 32px;background:#121212;color:#ffffff;">
              <p style="margin:0 0 8px;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#d4a017;">
                DTW 2026 Sponsorship Desk
              </p>
              <h1 style="margin:0;font-size:28px;line-height:1.2;">New Sponsorship Inquiry</h1>
            </div>
            <div style="padding:32px;">
              <p style="margin:0 0 20px;font-size:15px;line-height:1.7;color:#404040;">
                A prospective sponsor has submitted an inquiry through the Digital Transformation Week 2026 website.
              </p>

              <div style="margin:0 0 24px;padding:20px;background:#faf7f0;border:1px solid #eadfca;">
                <p style="margin:0 0 10px;font-size:13px;color:#7a6b52;text-transform:uppercase;letter-spacing:1px;">Sponsorship Interest</p>
                <p style="margin:0;font-size:24px;font-weight:700;color:#121212;">${escapeHtml(packageName)}</p>
                ${packageInvestment
                  ? `<p style="margin:8px 0 0;font-size:15px;color:#5c5344;">Investment level: ${escapeHtml(packageInvestment)}</p>`
                  : ""}
              </div>

              <table role="presentation" style="width:100%;border-collapse:collapse;margin-bottom:24px;">
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #eee2cb;font-size:14px;font-weight:700;color:#121212;width:180px;">Organization</td>
                  <td style="padding:10px 0;border-bottom:1px solid #eee2cb;font-size:14px;color:#404040;">${escapeHtml(payload.organizationName)}</td>
                </tr>
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #eee2cb;font-size:14px;font-weight:700;color:#121212;">Contact Person</td>
                  <td style="padding:10px 0;border-bottom:1px solid #eee2cb;font-size:14px;color:#404040;">${escapeHtml(payload.contactPerson)}</td>
                </tr>
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #eee2cb;font-size:14px;font-weight:700;color:#121212;">Email Address</td>
                  <td style="padding:10px 0;border-bottom:1px solid #eee2cb;font-size:14px;color:#404040;">${escapeHtml(payload.email)}</td>
                </tr>
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #eee2cb;font-size:14px;font-weight:700;color:#121212;">Phone Number</td>
                  <td style="padding:10px 0;border-bottom:1px solid #eee2cb;font-size:14px;color:#404040;">${escapeHtml(payload.phone)}</td>
                </tr>
              </table>

              <div style="margin:0 0 24px;">
                <p style="margin:0 0 10px;font-size:13px;color:#7a6b52;text-transform:uppercase;letter-spacing:1px;">Message</p>
                <div style="padding:18px;background:#ffffff;border:1px solid #eadfca;font-size:14px;line-height:1.7;color:#404040;">
                  ${escapeHtml(message).replace(/\n/g, "<br />")}
                </div>
              </div>

              <p style="margin:0;font-size:14px;line-height:1.7;color:#404040;">
                Reply directly to this email to continue the sponsorship conversation with the sender.
              </p>
            </div>
          </div>
        </div>
      `,
    });

    console.info("[sendgrid] package inquiry accepted", {
      to: env.SPONSORSHIP_INBOXES,
      from: env.SENDGRID_FROM_EMAIL,
      statusCode: response?.statusCode,
      messageId: response?.headers?.["x-message-id"] ?? response?.headers?.["X-Message-Id"],
    });
  } catch (error) {
    const responseBody =
      typeof error === "object" &&
      error !== null &&
      "response" in error &&
      typeof error.response === "object" &&
      error.response !== null &&
      "body" in error.response
        ? error.response.body
        : undefined;

    console.error("[sendgrid] package inquiry failed", {
      message: error instanceof Error ? error.message : "Unknown SendGrid error",
      responseBody,
      to: env.SPONSORSHIP_INBOXES,
      from: env.SENDGRID_FROM_EMAIL,
    });

    throw error;
  }
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
