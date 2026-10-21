# Practical 7 — Authentication & Middleware Pipeline

Full-stack task manager with registration/login, bcrypt password hashing, JWT authentication, user-owned tasks, protected routes, server-side validation, and frontend 401 handling.

## Security features
- Passwords hashed with bcryptjs (never plaintext).
- JWT signed with `JWT_SECRET`, expires after one hour.
- Bearer middleware verifies token and attaches user ID.
- Task routes are protected and scoped to the authenticated user.
- `GET /auth/me` returns the current profile.
- Logout clears the session token; invalid/expired tokens return the user to login.
- `.env` ignored by Git; `.env.example` contains placeholders only.

## Run (Node 18+ and MongoDB required)
Backend terminal: `cd "Practical 7/task-manager/backend"`, `npm install`, `cp .env.example .env`, set `MONGO_URI` and a random `JWT_SECRET` of at least 32 characters, then `npm run dev`.
Frontend terminal: `cd "Practical 7/task-manager/frontend"`, `npm install`, `cp .env.example .env`, then `npm run dev`.

## Flow
Register → bcrypt hash → user saved → login verifies password → JWT returned → client sends `Authorization: Bearer <token>` → middleware verifies it → routes access only that user's tasks.

## API
POST `/auth/register`, POST `/auth/login`, GET `/auth/me` (protected), GET/POST `/tasks` (protected), GET/PUT/DELETE `/tasks/:id` (protected), GET `/health`.

Never commit the real `.env` or JWT secret.