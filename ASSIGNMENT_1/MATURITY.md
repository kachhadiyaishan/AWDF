# Assignment 1 — Richardson Maturity Model Evaluation

**API evaluated:** Task Manager REST API in [Practical 4](../Practical%204/task-manager-api/README.md)  
**Course:** Advanced Web Development Frameworks (ITUE301)  
**Scope:** Richardson Maturity Model Levels 0–3, endpoint review, and HATEOAS awareness.

## Summary
The API reaches **Level 2**: it models tasks as resources with separate URLs, uses HTTP methods according to their intent, and returns meaningful HTTP status codes. It does not fully implement Level 3 because responses do not yet provide hypermedia controls that guide clients to related actions. The practical asks for a HATEOAS example in documentation, so the example below is illustrative and is not wired into the API.

## Richardson Maturity Model evaluation

| Level | Criterion | Does the API satisfy this? | Evidence |
|---|---|---|---|
| 0 — Swamp of POX | One endpoint acts as a single entry point; HTTP is mostly a transport tunnel. | No — the API goes beyond Level 0. | Resource-specific paths are used: `/tasks` and `/tasks/:id`. |
| 1 — Resources | Distinct resources have distinct URIs. | Yes. | `GET /tasks`, `GET /tasks/:id`, `POST /tasks`, `PUT /tasks/:id`, `DELETE /tasks/:id`. |
| 2 — HTTP verbs and status codes | Standard methods and meaningful status codes communicate results. | Yes. | GET reads (200), POST creates (201), PUT updates (200), DELETE removes (200); invalid input is 400, missing resources/routes are 404, unsupported media type is 415. |
| 3 — Hypermedia controls (HATEOAS) | Responses include links describing available actions and related resources. | Not yet. | Current responses contain data and metadata but no navigable `_links` controls. |

## Endpoint evidence

| Endpoint | Purpose | Success | Important failures |
|---|---|---:|---|
| `GET /tasks` | List tasks; optional `?completed=true` and `?q=...` filters. | 200 | Unknown paths return structured 404. |
| `GET /tasks/:id` | Read one task. | 200 | 400 malformed ID; 404 if not found. |
| `POST /tasks` | Create a task from JSON. | 201 | 415 without JSON content type; 400 invalid body. |
| `PUT /tasks/:id` | Update a task. | 200 | 400 malformed ID/body; 404 if not found; 415 without JSON content type. |
| `DELETE /tasks/:id` | Delete a task. | 200 | 400 malformed ID; 404 if not found. |
| Undefined route | Structured route-not-found response. | — | 404 `ROUTE_NOT_FOUND`. |

## HATEOAS awareness — Level 3 example

A future task response could include `self` and `delete` links, as suggested in the practical. These links are documentation only for this assignment.

```json
{
  "data": {
    "id": "task-123",
    "title": "Prepare presentation",
    "description": "Complete the slides",
    "completed": false
  },
  "_links": {
    "self": { "href": "/tasks/task-123", "method": "GET" },
    "update": { "href": "/tasks/task-123", "method": "PUT" },
    "delete": { "href": "/tasks/task-123", "method": "DELETE" },
    "collection": { "href": "/tasks", "method": "GET" }
  }
}
```

## Why many production APIs stop at Level 2
Level 2 provides clear resource URLs, standard HTTP methods, and meaningful status codes, making APIs predictable and straightforward to test. Level 3 requires clients to understand and follow links supplied by server responses. Hypermedia can improve discoverability and reduce hard-coded URL assumptions, but it adds design and maintenance work. Many APIs therefore prioritize consistent Level 2 conventions unless hypermedia-driven navigation is a clear product requirement.

## Middleware and error-handling notes
- Request logging is registered before routes and records method, URL, and ISO timestamp.
- JSON parsing runs before routes.
- POST and PUT require `Content-Type: application/json`.
- Route-specific ID validation runs before controller logic.
- Undefined routes return structured JSON 404.
- The global error handler is last and avoids exposing stack traces to clients.

## Testing checklist
- [ ] `GET /tasks` returns a list and count.
- [ ] `POST /tasks` returns 201 and a `Location` header.
- [ ] `GET /tasks/:id` returns 200 for an existing task.
- [ ] `PUT /tasks/:id` updates the selected task.
- [ ] `DELETE /tasks/:id` removes a task.
- [ ] Malformed IDs return 400; missing task IDs return 404.
- [ ] POST/PUT without JSON content type returns 415.
- [ ] Unknown paths return a structured 404.

## Reflection
The main design decision is to keep route handlers small and apply validation before modifying data. A common Express bug is incorrect middleware order: body parsing must happen before routes, and the error handler must be registered last. The API uses in-memory data because persistence is outside the Practical 4 scope; restarting the server resets the sample tasks.
