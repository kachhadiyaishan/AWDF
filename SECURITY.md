# Security Policy

## Scope

This repository contains educational practicals and assignments. Individual projects may intentionally demonstrate security concepts and are not automatically suitable for production deployment.

## Supported versions

Security fixes are considered for the current contents of the `main` branch. Older coursework snapshots may not receive updates.

## Reporting a vulnerability

Please do not publish exploit details, credentials, API keys, personal data, or a working proof of concept in a public issue.

Use GitHub's **Report a vulnerability** option in the repository's Security tab / private vulnerability reporting, if available, to contact the maintainer privately. Include:
- The affected folder, file, endpoint, or workflow.
- A concise description of the impact.
- Reproduction steps that avoid exposing real credentials or private data.
- Any suggested mitigation.

If private reporting is not enabled, open a minimal public issue asking for a private contact channel without including exploit details. Please allow time for review before publicly disclosing a confirmed vulnerability.

## Safe-use guidance

- Store real secrets in local `.env` files or a secrets manager; commit only placeholder `.env.example` files.
- Never put server-side API keys in frontend code or Vite-exposed environment variables.
- Use unique, strong local secrets and rotate any credential that may have been exposed.
- Use development certificates only for local learning.
- Do not expose demonstration services or test data to the public internet without an appropriate security review.
- Treat generated code and third-party dependencies as untrusted until reviewed.
