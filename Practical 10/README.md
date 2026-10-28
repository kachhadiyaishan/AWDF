# Practical 10 — Event-Driven Architecture

An Express/Mongoose task API uses Node's built-in EventEmitter to demonstrate asynchronous `task-created` and `task-deleted` notifications. A browser UI is included to trigger these events without requiring Postman.

## Run

Requirements: Node.js 18+ and a reachable MongoDB instance.

```bash
npm install
cp .env.example .env
# Set MONGO_URI if needed.
npm run dev
```

Open http://localhost:5000. Create a task and watch the server terminal: the API response timestamp is logged immediately, while the notification is intentionally delayed by about two seconds. Delete a task to see the deletion event. Health check: http://localhost:5000/health.

EventEmitter is a single-process demonstration, not a durable distributed queue. Use a message broker for production workloads that require persistence and retries.