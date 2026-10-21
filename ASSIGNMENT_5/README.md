# Assignment W11 — Cloud Service Models and Docker Resource Limits

This assignment extends Practical 11 with a cloud model comparison and Docker CPU/memory limits.

## Run and inspect
Requirements: Docker Desktop/Engine with Compose v2.

```bash
cd ASSIGNMENT_W11
docker compose up --build -d
docker stats
docker compose ps
```

Stop with `docker compose down`. Save a real screenshot of `docker stats` as `docs/docker-stats.png` and include it in CLOUD.md. A screenshot is intentionally not fabricated; it must come from your own Docker run. Compose resource-limit support depends on runtime/platform; inspect the actual values in Docker stats.

## Memory behavior
If a container exceeds its memory limit, the Linux kernel may invoke the OOM killer and terminate a process in the container. The container may exit or restart according to its restart policy, causing errors or downtime. Monitor usage, set limits from observed demand, and avoid limits too low for Node.js startup.