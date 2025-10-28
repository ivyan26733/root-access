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

## Deploy to Netlify

### Prerequisites
1. A [Netlify account](https://netlify.com)
2. Gmail app password (for contact form emails)
   - Go to https://myaccount.google.com/apppasswords
   - Generate a new app password

### Steps
1. Install Netlify CLI (optional, for local testing):
   ```bash
   npm install -g netlify-cli
   ```

2. Push your code to GitHub/GitLab/Bitbucket

3. In Netlify dashboard:
   - Click "Add new site" > "Import an existing project"
   - Connect your repository
   - Netlify will auto-detect settings from `netlify.toml`
   - Add environment variables:
     - `MY_EMAIL`: Your Gmail address
     - `MY_EMAIL_PASS`: Your Gmail app password
   - Click "Deploy"

### Local testing with Netlify Dev
```bash
cd frontend
npm install
netlify dev
```
This runs both frontend and functions locally.

### Notes
- The backend is now a serverless function at `netlify/functions/contact.js`
- Environment variables must be set in Netlify dashboard (Site settings > Environment variables)
- Contact form will send emails to `ivyan26733@gmail.com` (update in `contact.js` if needed)
