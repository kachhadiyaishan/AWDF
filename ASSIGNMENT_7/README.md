# Assignment A7 — AI-Assisted UI Customization and Design

Implements the Week 13 lab from the AWDF assignment PDF: an AI design-suggestion API, React button to request and display a suggestion, globally applied CSS custom properties, a responsible-AI evaluation, and before/after evidence instructions.

## Requirements
- Node.js 18+
- An OpenAI API key for live suggestions (the UI remains usable without one via a fallback)

## Start the backend
```bash
cd backend
npm install
cp .env.example .env
# Put your own key in backend/.env; do not commit it.
npm run dev
```
Backend health: http://localhost:5000/health

## Start the frontend
In a second terminal:
```bash
cd frontend
npm install
npm run dev
```
Open the URL printed by Vite, usually http://localhost:5173.

Click **Get AI Design Suggestion**. Review the colors, font pairing and layout suggestion. Click **Apply color scheme** to update the page theme using CSS variables defined globally in `src/style.css`. The theme can be reset at any time. If the API key is absent, the endpoint returns a clearly labeled fallback suggestion.

## Evidence for submission
Follow the checklist in `AIDESIGN.md` and capture screenshots from your own running app before and after applying the theme. Save them to `docs/before.png` and `docs/after.png`. The repository does not pretend that placeholder images are real execution evidence.