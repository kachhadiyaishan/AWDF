# Practical 6 — Full-Stack Task Manager

React + Express + MongoDB application with persistent CRUD and polished responsive UI.

## Features
- Dashboard with total, active, and completed counts.
- Create, edit, complete, search, filter, and delete tasks.
- Priority levels, loading/empty/error states, optimistic create with rollback, delete confirmation, and toast feedback.
- Centralized API utility and CORS configuration.

## Run (Node 18+ and MongoDB required)
Terminal 1:
```bash
cd "Practical 6/task-manager/backend"
npm install
cp .env.example .env
# Set MONGO_URI in .env
npm run dev
```
Terminal 2:
```bash
cd "Practical 6/task-manager/frontend"
npm install
cp .env.example .env
npm run dev
```
Open the Vite URL (normally http://localhost:5173). Backend runs at http://localhost:5000.

Architecture: React UI → src/api.js → Express routes → Mongoose → MongoDB. The UI updates from server responses and reloads persisted data after refresh.