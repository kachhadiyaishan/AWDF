# Assignment 3 — Performance Load Testing with Apache Bench

This Express/MongoDB API exposes `GET /tasks` with an optional in-memory cache, a deterministic seed script, and a repeatable Apache Bench test plan.

## Run
Requirements: Node.js 18+, MongoDB, and Apache Bench (`ab`; on Windows use WSL or XAMPP).

```bash
cd ASSIGNMENT_3
npm install
cp .env.example .env
npm run seed
CACHE_ENABLED=false npm start
```
In another terminal run the baseline commands in LOADTEST.md. Stop and restart with `CACHE_ENABLED=true npm start` for the cached test. Ensure the same database and dataset are used in both runs.

**Important:** LOADTEST.md has a results template, not invented measurements. Fill it with the actual outputs from your machine, and include the extra `-c 50` test requested by the lab.