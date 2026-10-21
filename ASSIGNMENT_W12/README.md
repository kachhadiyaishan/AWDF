# Assignment W12 — Blue-Green Deployment Simulation

This standalone Compose project runs two versions of a Node.js API at once: blue on host port 5000 and green on host port 5001. A small React frontend calls the currently selected API.

## Start both versions

```bash
cd ASSIGNMENT_W12
docker compose up --build -d
curl http://localhost:5000/version
curl http://localhost:5001/version
```

Expected JSON values are `{"version":"blue"}` and `{"version":"green"}`. Open http://localhost:5173.

## Switch traffic to green

Set `VITE_API_BASE_URL=http://localhost:5001` in `.env` (copy `.env.example` first), then rebuild/recreate only the frontend:

```bash
cp .env.example .env
# edit .env and set VITE_API_BASE_URL=http://localhost:5001
docker compose up --build -d frontend
```

The browser bundle now calls green. To roll back, change the value to `http://localhost:5000` and run the same command. Because this is a teaching simulation with a static frontend rebuild, it demonstrates traffic switching but is not a production-grade zero-downtime load balancer. A reverse proxy or orchestrator can switch an upstream more seamlessly.

See DEPLOYMENT.md for the process, rollback plan, and blue-green vs rolling-update comparison.