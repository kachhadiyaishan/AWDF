# Practical 13 — AI API Integration into a Web Application
Adds an editable AI-generated task-description suggestion to React. The OpenAI API key is read only by the Express backend from `.env`; never expose it in frontend code or commit it.

Backend: `cd backend && npm install && cp .env.example .env && npm run dev` (set OPENAI_API_KEY in backend/.env). Frontend: in another terminal `cd frontend && npm install && npm run dev`. Requires Node 18+ and a valid API key for live suggestions. If the provider fails or is not configured, a local fallback suggestion is returned. The UI has a loading state and AI disclaimer. A simple per-client one-request-per-minute limiter is included.

Responsible AI: send only task titles; never send passwords, student records, confidential information, health details, or other sensitive data. Review and edit every suggestion.