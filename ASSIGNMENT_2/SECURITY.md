# Security Review — STRIDE, TLS and Input Sanitization

## STRIDE threat model

| Threat | Example in this task app | Mitigation applied or planned |
|---|---|---|
| **Spoofing** | An attacker submits a forged identity to a future login endpoint. | The sample login endpoint does not grant access; production must use verified credentials, secure password hashing, rate limits, and MFA where appropriate. |
| **Tampering** | A client submits `{ "$set": { "role": "admin" } }` or changes task fields. | Reject operator/dotted keys, apply `express-mongo-sanitize` before routes, validate allowed fields, and use schema validation. |
| **Repudiation** | A user denies creating or changing a task. | Planned: structured audit logs with request IDs, timestamps, actor IDs, and restricted log access; never log passwords or tokens. |
| **Information Disclosure** | Stack traces or database details leak in an error response. | Generic client error messages, limited JSON payload size, and server-side logs; production logs need access controls and redaction. |
| **Denial of Service** | Oversized JSON bodies or repeated expensive requests consume resources. | 20 KB JSON limit and bounded task listing; production should add rate limiting, timeouts, monitoring, and database indexes. |
| **Elevation of Privilege** | A user edits a task they do not own or changes a role field. | Only accept explicit fields; production routes must authenticate identity and enforce ownership/role checks on every operation. |

## HTTPS vs HTTP and JWT

HTTP sends application traffic without transport encryption. HTTPS wraps HTTP in TLS, which provides confidentiality against passive observation, integrity against in-transit modification, and server authentication when certificate validation succeeds. mkcert creates locally trusted development certificates; it is not a replacement for a publicly trusted certificate in production.

JWT is an application-level token format often used to carry claims and support authentication/authorization decisions. A signed JWT can help a server validate token integrity, but a typical signed JWT is not encrypted by default. JWT does **not** encrypt network traffic, so it does not replace HTTPS. HTTPS does not by itself decide which user may access a task; the application still needs authentication and authorization checks.

## Sanitization test

Send a payload with MongoDB operators such as `{"email":{"$gt":""},"password":{"$gt":""}}`. The demo login endpoint should reject non-string input with HTTP 400. Sanitization is defense in depth; validate expected types and fields as well. Compare before/after behavior only in a local test environment and record actual responses in your lab notes.

## Responsible implementation notes

- Keep TLS private keys, real credentials, and production tokens out of Git.
- Keep sanitizer middleware before every route that consumes user-controlled data.
- Avoid logging sensitive request bodies.
- This teaching API is not production-ready authentication: login intentionally returns 501 for valid-looking input instead of pretending to authenticate.
