# Assignment 2 — Threat Modelling, HTTPS/TLS and Secure Coding

A focused Express/MongoDB task API demonstrating input validation, NoSQL operator sanitization, optional local HTTPS with mkcert, and a STRIDE review.

## Requirements
Node.js 18+ and MongoDB. Install dependencies with `npm install`.

## Run HTTP locally
```bash
cd ASSIGNMENT_2
cp .env.example .env
npm install
npm run dev
```
Visit `http://localhost:5000/health`.

## Enable local HTTPS
Install mkcert for your OS, then run:
```bash
mkcert -install
mkcert -key-file localhost-key.pem -cert-file localhost.pem localhost 127.0.0.1 ::1
```
Set `HTTPS=true` in `.env` and restart. HTTPS listens on port 5443. Certificates and private keys are excluded by .gitignore and must never be committed. mkcert is for local development only, not public production certificates.

## Test sanitization
```bash
curl -i -X POST http://localhost:5000/api/login -H "Content-Type: application/json" -d '{"email":{"$gt":""},"password":{"$gt":""}}'
```
The request should be rejected as invalid input (400), not treated as a successful login. The demo login route intentionally never authenticates a real user; it exists to demonstrate validation.

See SECURITY.md for the six STRIDE categories and the HTTP/TLS vs JWT comparison. This is an educational sample, not a complete production auth system.