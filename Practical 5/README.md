# Practical 5 — MongoDB Integration & Mongoose Schema Design

A database-backed upgrade of Practical 4. The in-memory array is replaced by MongoDB persistence through Mongoose.

## Features
- Task schema with required title, description, completed default, createdAt, and priority enum (low/medium/high).
- Pre-save hook trims title whitespace.
- CRUD endpoints backed by MongoDB; filtering by completion, priority, and text.
- Consistent JSON validation/error responses, invalid ID handling, and 404 for missing documents.
- Environment-based connection; no secrets committed.

## Setup
Requires Node.js 18+ and MongoDB local or Atlas.
```bash
cd "Practical 5/task-api"
npm install
cp .env.example .env
# Set MONGO_URI in .env
npm run dev
```
API: http://localhost:5000

| Method | Endpoint | Purpose |
|---|---|---|
| GET | /tasks | List tasks; optional ?completed=true, ?q=..., ?priority=high |
| GET | /tasks/:id | Get one task |
| POST | /tasks | Create |
| PUT | /tasks/:id | Update |
| DELETE | /tasks/:id | Delete |
| GET | /health | Database status |

Mongoose validation runs in the application layer before persistence. Keep `.env` private and use `.env.example` as a template.