# Practical 12 — CI/CD with GitHub Actions
The workflow at `.github/workflows/ci.yml` runs on pushes and pull requests targeting main, installs Node dependencies, and runs Jest/Supertest. This demonstrates Continuous Integration, not deployment.

Run locally: `npm install && npm test`. Tests use an in-memory Express API and need no MongoDB. To demonstrate a failure, temporarily alter one expected value, push, observe the failed Actions run, then restore it and push again. Do not leave a broken test committed.