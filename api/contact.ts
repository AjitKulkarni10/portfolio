import type { VercelRequest, VercelResponse } from "@vercel/node";
import nodemailer from "nodemailer";

const RATE_LIMIT = {
  windowMs: 60_000,
  maxRequests: 5,
};

const ipHits = new Map<string, { count: number; start: number }>();

function rateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = ipHits.get(ip);

  if (!entry) {
    ipHits.set(ip, { count: 1, start: now });
    return true;
  }

  if (now - entry.start > RATE_LIMIT.windowMs) {
    ipHits.set(ip, { count: 1, start: now });
    return true;
  }

  if (entry.count >= RATE_LIMIT.maxRequests) {
    return false;
  }

  entry.count++;
  return true;
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  const ip =
    (req.headers["x-forwarded-for"] as string)?.split(",")[0] ||
    req.socket.remoteAddress ||
    "unknown";

  if (!rateLimit(ip)) {
    return res.status(429).json({
      error: "Too many requests. Please try again later.",
    });
  }
  
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  if (!email.includes("@")) {
    return res.status(400).json({ error: "Invalid email" });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL,
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: Arial, sans-serif">
          <h2>New Contact Form Submission</h2>
          <p><b>Name:</b> ${name}</p>
          <p><b>Email:</b> ${email}</p>
          <p>${message.replace(/\n/g, "<br/>")}</p>
        </div>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Email error:", err);
    return res.status(500).json({ error: "Failed to send email" });
  }
}