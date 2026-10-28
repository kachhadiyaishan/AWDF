# Project Structure and Run Guide

This repository contains independent coursework folders. A missing HTML/CSS file is only a defect when that project requires a browser UI; API, security, load-testing, and architecture assignments can correctly be backend- or documentation-only.

## Practical projects

| Folder | Project type | Run entry point | UI / required service |
|---|---|---|---|
| `PRACTICAL 1/student-portfolio` | React frontend | `npm run dev` in project folder | Vite + React |
| `Practical 2/student-portfolio` | React frontend | `npm run dev` in project folder | Vite + React |
| `Practical 3/repository-explorer` | React frontend | `npm run dev` in project folder | Vite + React; provider configuration may be needed |
| `Practical 4/task-manager-api` | Express API + browser UI | `npm run dev` in project folder | Open http://localhost:5000; in-memory data |
| `Practical 5/task-api` | Express/Mongoose API | `npm run dev` in project folder | MongoDB; API client or frontend |
| `Practical 6/task-manager` | React + Express/Mongoose | Start backend and frontend in separate terminals | MongoDB |
| `Practical 7/task-manager` | Authenticated React + Express/Mongoose | Start backend and frontend in separate terminals | MongoDB; configure local secrets |
| `Practical 8` | React lazy-loading demo | `npm install && npm run dev` | Vite + React |
| `Practical 9` | Express/Mongoose caching API + browser UI | `npm run dev` in folder | MongoDB; open http://localhost:5000 |
| `Practical 10` | Express/Mongoose event-driven API + browser UI | `npm run dev` in folder | MongoDB; open http://localhost:5000 |
| `Practical 11` | Dockerized frontend + backend | `docker compose up --build` | Docker |
| `Practical 12` | Express API + automated tests | `npm test` in folder | Node.js; tests run without a browser UI |
| `Practical 13` | React + AI-enabled Express backend | Start backend and frontend separately | Node.js; optional provider API key |
| `CIE1_PRACTICAL_EXAM` | Leave management React + Express app | Follow folder README | MongoDB and local environment configuration |

## Assignments

- **Assignment 1:** API maturity analysis and report. The implementation under review is Practical 4; the report is the deliverable.
- **Assignment 2:** Security-focused Express/Mongoose API and security documentation. A separate browser frontend is not required to demonstrate the API/security objectives.
- **Assignment 3:** Load-testing API, seed script, and test plan. Use the documented load-testing tool and record real measurements; do not fabricate results.
- **Assignment 4:** Architecture design report. The architecture document is the core deliverable.
- **Assignment 5:** Docker Compose frontend/backend and cloud deployment notes.
- **Assignment 6:** Blue-green deployment simulation using Docker Compose and a React frontend.
- **Assignment 7:** AI-assisted UI customization with React frontend and Express backend.

## Common setup

1. Install Node.js 18+ (or the version specified by a project's package file).
2. For a project with a `.env.example`, copy it to `.env` and set local values. Never commit API keys or passwords.
3. Run `npm install` in each independent Node.js project folder.
4. For React projects, run the frontend's Vite server in its own terminal. For full-stack projects, start the backend too.
5. For MongoDB-backed projects, start MongoDB locally or set `MONGO_URI` to a reachable database.
6. Use the folder-specific README as the source of truth for commands, ports, and project-specific requirements.

## Browser demo vs. public hosting

The GitHub Pages hub is a directory of source folders and documentation. It does not run Node.js servers, connect to private databases, or deploy each frontend/backend automatically. Run projects locally using their README instructions, or deploy each required frontend and backend to compatible hosting services.
