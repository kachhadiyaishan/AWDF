# Practical 9 — In-Memory Caching and Query Optimization
Express/Mongoose API using node-cache with a 60-second TTL, per-item and list cache, hit/miss metrics, and invalidation on create/update/delete.

Run `npm install`, copy `.env.example` to `.env`, configure MongoDB, then `npm run dev`. Routes: GET/POST /tasks, GET/PUT/DELETE /tasks/:id, GET /debug/cache. GET responses include `X-Cache: HIT|MISS`. Record three response times with cache enabled and disabled in Postman; do not invent readings. node-cache is process-local, so multi-instance deployments need a shared cache such as Redis.