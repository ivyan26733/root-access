# Interactive Resume App

## Stack
- Frontend: React + Vite + Tailwind + Framer Motion + Lucide Icons
- Backend: Node.js + Express + Nodemailer

## Features
- Sticky left profile card with avatar glow
- Animated resume sections (Experience, Education, Skills...)
- Contact card:
  - WhatsApp / Telegram / Email buttons
  - Message form that sends email to you via backend `/api/contact`
- Resume data fully driven by `resumeData.json`

## Run frontend
cd frontend
npm install
npm run dev

## Run backend
cd backend
npm install
MY_EMAIL="yourgmail@gmail.com" MY_EMAIL_PASS="your_app_password" node server.js

> Use a Gmail app password (not your real password).

## Connect frontend form to backend
In `ContactMeCard.jsx`, update fetch("http://localhost:4000/api/contact", ...) if your backend URL changes.

## Replace avatar
Put your real headshot in:
frontend/public/images/arjun-avatar.jpg
