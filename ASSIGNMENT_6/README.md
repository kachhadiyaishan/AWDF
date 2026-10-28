# Assignment 6 — Blue-Green Deployment Simulation

This standalone Docker Compose project runs two versions of a Node.js API at once: blue on host port 5000 and green on host port 5001. A small React frontend calls the currently selected API.

## Start both versions

Run these commands from the repository root:

```bash
cd ASSIGNMENT_6
docker compose up --build -d
curl http://localhost:5000/version
curl http://localhost:5001/version
```

The endpoints should return JSON identifying the blue and green versions. Open the frontend at http://localhost:5173.

## Switch traffic to green

Copy the environment example if the project provides one, then set `VITE_API_BASE_URL=http://localhost:5001` in the frontend's environment configuration. Rebuild/recreate the frontend:

```bash
docker compose up --build -d frontend
```

To roll back, set `VITE_API_BASE_URL=http://localhost:5000` and rebuild the frontend. Because this is a teaching simulation using a frontend rebuild to change the target, it is not a production-grade zero-downtime load balancer. A reverse proxy or orchestrator can switch an upstream more seamlessly.

See [DEPLOYMENT.md](./DEPLOYMENT.md) for the process, rollback plan, and blue-green vs. rolling-update comparison.
