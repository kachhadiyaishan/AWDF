# Practical 9 — In-Memory Caching and Query Optimization

Express/Mongoose task API with a 60-second configurable node-cache TTL, list and item caching, cache metrics, and invalidation after mutations. Includes a responsive browser UI for creating and deleting tasks and inspecting cache metrics.

## Run

Requirements: Node.js 18+ and a reachable MongoDB instance.

```bash
npm install
cp .env.example .env
# Set MONGO_URI in .env if your MongoDB URL differs from the default.
npm run dev
```

Open http://localhost:5000. Health check: http://localhost:5000/health. Cache metrics: http://localhost:5000/debug/cache. Browser UI and API are served from the same origin.

## Demonstrate caching

1. Open browser DevTools → Network.
2. Refresh the task list twice; compare the `X-Cache: MISS` and `X-Cache: HIT` response headers.
3. Create or delete a task, then refresh the list to observe cache invalidation.
4. Record your own response timings; results depend on your machine and database. Do not report invented measurements.

The cache is process-local; multi-instance deployments need shared caching such as Redis.