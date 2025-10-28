import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// health
app.get("/api/health", (req, res) => {
  res.json({ ok: true, status: "running" });
});

// contact route
app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
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

    res.json({ ok: true, delivered: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not send message" });
  }
});

// serve resume json
app.get("/api/resume", (req, res) => {
  const resumePath = path.join(__dirname, "..", "frontend", "src", "data", "resumeData.json");
  const raw = fs.readFileSync(resumePath, "utf8");
  res.setHeader("Content-Type", "application/json");
  res.send(raw);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log("API ready on http://localhost:" + PORT);
});
