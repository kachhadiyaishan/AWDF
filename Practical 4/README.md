# Practical 4 — Task Manager REST API + Web UI

A runnable Express task manager demonstrating in-memory CRUD, request logging, JSON validation, route-specific ID validation, structured 404 responses, centralized error handling, and a responsive HTML/CSS/JavaScript interface.

## Run locally

Requirements: Node.js 18 or newer.

```bash
cd "Practical 4/task-manager-api"
npm install
npm run dev
```

Open **http://localhost:5000**. The API and static frontend are served from the same process, so no separate frontend server or CORS setup is required. Use **http://localhost:5000/health** to check server status.

## API routes

- `GET /tasks` — list tasks; supports `?completed=true` and `?q=...`.
- `GET /tasks/:id` — retrieve a task.
- `POST /tasks` — create a task (JSON body with a non-empty `title`).
- `PUT /tasks/:id` — update a task.
- `DELETE /tasks/:id` — delete a task.
- `GET /health` — health check.

## Notes

Tasks are stored in memory and reset when the server restarts. This practical is self-contained; it does not require MongoDB or API keys. Test API routes with the included browser UI, Postman, Thunder Client, or curl.
