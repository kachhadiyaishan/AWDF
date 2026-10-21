# Blue-Green Deployment Notes

## Goal
Blue-green deployment keeps the current version (blue) running while a new version (green) is started and verified. Traffic is then switched to the green version. The old version remains available for rollback until the new release is considered stable.

## What changed

- `backend-blue` and `backend-green` are built from the same backend source but receive different `VERSION` environment variables.
- Blue maps host port 5000 to container port 5000; green maps host port 5001 to container port 5000.
- The API's `GET /version` endpoint reports the environment value so both instances can be checked independently.
- The frontend uses build-time `VITE_API_BASE_URL` to choose the active API.

## Deploy and verify

1. Run `docker compose up --build -d`.
2. Check `curl http://localhost:5000/version` and confirm `blue`.
3. Check `curl http://localhost:5001/version` and confirm `green`.
4. Test both endpoints and inspect `docker compose ps` and logs.
5. Change `VITE_API_BASE_URL` in `.env` from port 5000 to port 5001.
6. Run `docker compose up --build -d frontend`, then refresh the browser and verify that the UI is talking to green.
7. Keep blue running until green is validated; only then decide whether to retire it.

## How downtime is reduced

Both backend containers run simultaneously, so the candidate green instance can be started and checked before the frontend is pointed at it. This avoids taking the backend offline just to replace its process. This demo's frontend rebuild/reload can still cause a short transition and is not a guarantee of zero downtime. In production, route through a reverse proxy/load balancer and atomically change the upstream, with health checks and backward-compatible data changes.

## Rollback if green has a critical bug

1. Change `VITE_API_BASE_URL` back to `http://localhost:5000`.
2. Rebuild/recreate the frontend with `docker compose up --build -d frontend`.
3. Confirm `curl http://localhost:5000/version` and verify the UI against blue.
4. Keep green available for log inspection, then review `docker compose logs backend-green`.
5. Fix and retest green before attempting another switch. Avoid irreversible database migrations; blue and green should remain compatible with the same data during rollback.

## Blue-green compared with rolling updates

Blue-green keeps two complete environments active and switches traffic between them, making rollback straightforward but temporarily requiring capacity for both versions. A rolling update replaces instances gradually, usually using fewer extra resources, but old and new versions coexist while the rollout progresses. Blue-green is useful for risky releases where quick rollback is important; rolling updates suit horizontally scaled services that can safely run mixed versions. Either strategy needs health checks, observability, and backward-compatible database changes.

## Evidence checklist

- [ ] Capture the actual JSON returned by both `/version` endpoints.
- [ ] Capture `docker compose ps` showing both backends running.
- [ ] Record the active frontend API URL before and after the switch.
- [ ] Record any errors and how they were resolved.

Evidence should be captured from your own Docker run; no sample output is represented as a real test run.