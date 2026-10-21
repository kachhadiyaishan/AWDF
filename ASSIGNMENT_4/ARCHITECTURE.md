# Monolithic vs Microservices Architecture Analysis

## Current monolith

The current Task Management application can be deployed as one Express backend with routes and shared middleware. The React frontend calls the Express API, and the backend uses MongoDB. Authentication, task CRUD, caching, and event handling share a deployment unit.

```text
              [React Frontend]
                     |
                     v
               [Express App]
                 |   |   |  \
                 |   |   |   +-- Event Emitter
                 |   |   +------ Cache Layer
                 |   +---------- Task Routes
                 +-------------- Auth Routes
                     |
                     v
                  [MongoDB]
```

## Proposed microservices decomposition

Services should be split by business capability rather than by source file. An API gateway or reverse proxy provides a stable frontend entry point and forwards requests to independently deployed services.

```text
                  [React Frontend]
                         |
                         v
                    [API Gateway]
                    /     |      \
                   v      v       v
            [Auth Service] [Task Service] [Notification Service]
            register/login  task CRUD/cache  event side effects
            JWT issuance    owns task data   future queue/worker
                   |        |                |
                [Auth DB] [Task DB]       [Notification DB]
```

The diagram shows a possible design, not an implementation already deployed. A first version could share MongoDB infrastructure while keeping separate collections and clear ownership; independent databases improve isolation but increase operational work and cross-service coordination.

## Trade-off table

| Aspect | Monolith | Microservices |
|---|---|---|
| Deployment | One Express app and one release; easy for a student to run locally. | Auth, task, and notification services deploy separately; more pipelines, configuration, and service discovery. |
| Scalability | Scale the entire API even if only task reads are busy. | Scale Task Service independently during a peak in task-list traffic; Auth can remain smaller. |
| Complexity | In-process calls and simpler debugging; a crash or shared resource issue can affect all routes. | Network calls, retries, tracing, and eventual consistency add failure modes; boundaries can isolate faults when designed well. |
| Team size fit | Best fit for a small student team and short academic timeline. | More useful when multiple teams own stable domains and can operate services independently. |
| Data consistency | Shared database operations can be straightforward and transactional. | Service-owned data reduces coupling but cross-service workflows may need events/sagas and eventual consistency. |

## Decision for this fifth-semester project

A **modular monolith** is the more appropriate choice for the current student project. It keeps setup, deployment, debugging, and grading manageable while the team is still learning authentication, CRUD, caching, and event-driven behavior. Modules and clear interfaces can prepare for future extraction. Microservices would become reasonable if task traffic needed independent scaling, different teams owned auth/tasks/notifications, or services had distinct reliability requirements; adopting them early would add deployment and observability overhead without enough demonstrated benefit.

## Stateless services and JWT

A Task Service can be stateless when each request carries a verifiable JWT and the service does not keep session state in its own process memory. Any healthy replica can validate the token and handle the request, making horizontal scaling easier behind a load balancer. Stateless does not mean the system has no state: task records still live in a database, and the service may still use shared caches. JWT signature, issuer/audience, expiry, and authorization claims must be validated correctly; ownership checks must still ensure a user can only access their own tasks. Token revocation and key rotation require an explicit strategy.

## Migration path

1. Keep the monolith, but separate auth, task, and notification modules behind stable interfaces.
2. Add metrics and identify a real scaling or ownership need before extracting anything.
3. If justified, extract notifications first because side effects can often be driven by events without sharing task-table writes.
4. Add API gateway routing, service health checks, retries/timeouts, distributed tracing, and independent deployment before production use.
