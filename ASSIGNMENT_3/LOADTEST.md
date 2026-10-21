# Apache Bench Load Test Report

## Environment and method

- Date/time: **fill after running tests**
- OS / CPU / RAM: **record your machine**
- Node.js version: **record `node --version`**
- MongoDB version and dataset: **record version; seed script creates 100 tasks**
- Apache Bench version: **record `ab -V`**
- Endpoint: `GET http://localhost:5000/tasks`

Run the same number of requests with the same concurrency and dataset for a fair comparison. Restart the server between cache modes so environment variables are applied.

## Commands

Baseline (without cache):

```bash
CACHE_ENABLED=false npm start
ab -n 200 -c 10 -g baseline.tsv http://localhost:5000/tasks
ab -n 200 -c 50 -g baseline-c50.tsv http://localhost:5000/tasks
```

Stop the server, then run cached mode in a separate terminal:

```bash
CACHE_ENABLED=true npm start
ab -n 200 -c 10 -g cached.tsv http://localhost:5000/tasks
ab -n 200 -c 50 -g cached-c50.tsv http://localhost:5000/tasks
```

Record the **actual** RPS, mean time per request, and failed requests shown by each run. Warm the cache with one GET before the cached test if needed, and ensure all tests finish within the 120-second TTL.

## Results table — fill with real output

| Metric | Without cache (c=10) | With cache (c=10) | Without cache (c=50) | With cache (c=50) |
|---|---:|---:|---:|---:|
| Requests per second | TBD | TBD | TBD | TBD |
| Mean time per request (ms) | TBD | TBD | TBD | TBD |
| Failed requests | TBD | TBD | TBD | TBD |
| Non-2xx responses | TBD | TBD | TBD | TBD |

Do not report the TBD entries as results; replace them after running Apache Bench. Save terminal output in your lab evidence folder if required.

## Analysis (complete after measurement)

Caching can reduce repeated database reads for a frequently requested collection, so it may increase throughput and reduce average response time while the cache remains warm. It also consumes process memory and can return stale data until expiration or explicit invalidation. Higher concurrency increases simultaneous work and may expose CPU, connection-pool, or database bottlenecks. Compare measured RPS, latency, and failed requests rather than assuming caching always wins; note the dataset size, cache warm-up, TTL, and machine specs when interpreting results.

## Troubleshooting

- If `ab` is missing, use WSL or XAMPP on Windows.
- If requests fail, check `curl -i http://localhost:5000/health` and MongoDB connectivity.
- If cache and non-cache results are similar, confirm `CACHE_ENABLED=true`, warm the cache, and inspect `X-Cache` response headers.
