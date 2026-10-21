# Practical 4 — Task Manager REST API

A Node.js + Express REST API implementing in-memory task CRUD, request logging, JSON validation, route-specific ID validation, structured 404 responses, and centralized error handling.

## Routes
- `GET /tasks` — list tasks (200), optional `?completed=true` and `?q=...`.
- `GET /tasks/:id` — retrieve one task (200 or 404).
- `POST /tasks` — create a task (201; JSON content type and title required).
- `PUT /tasks/:id` — update a task (200 or 400/404).
- `DELETE /tasks/:id` — delete a task (200 or 404).
- `GET /health` — health check (200).

## Run
```bash
cd "Practical 4/task-manager-api"
npm install
npm run dev
```
Server: http://localhost:5000. Test with Postman, Thunder Client, or curl. Data is in memory and resets when the server restarts.
