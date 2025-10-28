import nodemailer from "nodemailer";

export async function handler(event) {
  // Only allow POST
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    const { name, email, message } = JSON.parse(event.body);

    if (!message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Message is required" }),
      };
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MY_EMAIL,
        pass: process.env.MY_EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Resume Contact Bot" <${process.env.MY_EMAIL}>`,
      to: "ivyan26733@gmail.com",
      subject: `New message from ${name || "Unknown"} via resume site`,
      text: `
From: ${name || "N/A"} <${email || "N/A"}>
Message:
${message}
      `,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ ok: true, delivered: true }),
    };
  } catch (err) {
    console.error("Contact function error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Could not send message" }),
    };
  }
}
