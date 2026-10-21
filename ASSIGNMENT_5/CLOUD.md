# Cloud Service Models and Docker Resource Limits

## Comparison

| IaaS | PaaS | Serverless |
|---|---|---|
| **Who manages:** Provider manages physical hardware and virtualization; customer manages OS, runtime, application, and much of networking/security configuration. | **Who manages:** Provider manages infrastructure, OS, and supported runtime/platform; customer manages application code and data/configuration. | **Who manages:** Provider manages infrastructure and runtime execution; customer supplies functions/handlers and configuration. Capacity is commonly allocated per invocation/event. |
| **Examples:** AWS EC2, Azure Virtual Machines, Google Compute Engine. | **Examples:** Azure App Service, Google App Engine, Heroku. | **Examples:** AWS Lambda, Azure Functions, Google Cloud Run functions. |
| **Use when:** You need OS-level control, custom networking, or legacy workloads. | **Use when:** You want to deploy web apps/APIs without managing servers and OS patching. | **Use when:** Work is event-driven or bursty and scaling-to-zero or per-use billing is useful. |

## Mapping this Docker Compose setup

The local Compose stack is closest to **IaaS-style infrastructure management** as a learning environment: the developer manages the host machine/VM, Docker engine, container images, application runtime, and networking configuration. Compose is a container orchestration tool, not itself a cloud service model. If the same container images were deployed to a managed application platform, more OS/runtime operations could shift to a PaaS provider.

## Resource limits

The backend service is configured with a 0.5 CPU quota, 256 MB memory limit, and 128 MB memory reservation. The Compose file includes both `deploy.resources` (useful for compatible orchestrators) and service-level `cpus`/`mem_limit` keys for local Compose implementations. Actual enforcement and display depend on Docker runtime/platform; verify rather than assuming.

Run:

```bash
docker compose up --build -d
docker stats
```

### Docker stats evidence

**Attach your real screenshot here:** save it as `docs/docker-stats.png`, then replace this note with:

![Docker stats showing resource use](docs/docker-stats.png)

Record the observed backend CPU %, memory usage/limit, and whether the values remain below the configured limits. Do not use sample or fabricated readings.

### OOM and reliability reflection

When memory use exceeds the enforced container limit, the kernel can kill the process that triggered the allocation (an OOM kill). A backend may stop responding or exit; `restart: unless-stopped` can restart the container, but does not prevent failed requests or a brief outage. Diagnose with `docker inspect`, `docker compose logs backend`, and `docker stats`; raise the limit or reduce application memory demand based on measurements.

### Troubleshooting

- If `docker stats` does not show the expected limit, confirm Docker Compose version and inspect the effective container configuration; local Compose may ignore Swarm-only `deploy` settings, which is why service-level limits are also present.
- If Node exits at startup, inspect logs and memory usage before raising the limit; Node runtime overhead and application workload affect minimum requirements.
- To stop and clean up containers: `docker compose down`. The MongoDB named volume remains unless explicitly removed.