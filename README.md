# Advanced Web Development Frameworks (AWDF)

A structured collection of practicals and assignments for **Advanced Web Development Frameworks (ITUE301)**. This repository documents hands-on work across React, REST APIs, MongoDB, security, performance optimization, architecture, Docker, CI/CD, and AI-assisted application design.

> **Repository:** [kachhadiyaishan/AWDF](https://github.com/kachhadiyaishan/AWDF)  
> Each practical and assignment is kept in its own folder with a dedicated README where applicable.

## Table of contents

- [Learning areas](#learning-areas)
- [Practicals](#practicals)
- [Assignments](#assignments)
- [CIE practical exam](#cie-practical-exam)
- [Technology stack](#technology-stack)
- [Getting started](#getting-started)
- [Configuration and security](#configuration-and-security)
- [Evidence and testing notes](#evidence-and-testing-notes)

## Learning areas

- **Frontend development:** component-based React interfaces, responsive styling, and lazy loading.
- **Backend development:** Express APIs, REST conventions, request validation, and centralized error handling.
- **Data layer:** MongoDB/Mongoose models, CRUD operations, query optimization, and caching.
- **Application security:** authentication concepts, JWT-protected routes, input sanitization, TLS, and STRIDE threat modelling.
- **Performance and architecture:** Apache Bench load-testing plans, cache metrics, event-driven patterns, and monolith/microservice trade-offs.
- **DevOps:** Docker and Docker Compose, resource limits, CI workflows, and blue-green deployment concepts.
- **AI-assisted development:** AI API integration, design suggestions, UI customization, and responsible review of generated output.

## Practicals

| Practical | Focus | What is included |
|---|---|---|
| [Practical 1](./PRACTICAL%201/) | Student portfolio | React portfolio with reusable components and responsive styling. |
| [Practical 2](./Practical%202/) | React portfolio development | Component-based portfolio project and setup notes. |
| [Practical 3](./Practical%203/) | GitHub repository explorer | React interface for exploring repository information. |
| [Practical 4](./Practical%204/) | REST API fundamentals | Express task-management API with routes and error handling. |
| [Practical 5](./Practical%205/) | MongoDB/Mongoose CRUD | Task API, schema validation, filtering, and error handling. |
| [Practical 6](./Practical%206/) | Full-stack task manager | React frontend connected to an Express/MongoDB backend. |
| [Practical 7](./Practical%207/) | Authentication and protected routes | Registration/login flow, password hashing, JWT authentication, and user-scoped tasks. |
| [Practical 8](./Practical%208/) | Performance optimization | React route-level code splitting with `React.lazy()` and `Suspense`. |
| [Practical 9](./Practical%209/) | Caching and query optimization | Express/Mongoose API with TTL caching, cache hit/miss headers, and invalidation. |
| [Practical 10](./Practical%2010/) | Event-driven architecture | Node.js `EventEmitter` demonstration for task events and notification listeners. |
| [Practical 11](./Practical%2011/) | Docker and Docker Compose | Containerized React, Express, and MongoDB services. |
| [Practical 12](./Practical%2012/) | CI with GitHub Actions | Automated test workflow for pushes and pull requests. |
| [Practical 13](./Practical%2013/) | AI API integration | React UI for AI-generated task-description suggestions with backend-side API-key handling and fallback behavior. |

Open each practical's README for its specific dependencies, commands, endpoints, and exercise instructions.

## Assignments

| Assignment | Focus | Deliverables |
|---|---|---|
| [Assignment 1](./ASSIGNMENT_1/) | Richardson Maturity Model | Evaluation of the Task Manager REST API, currently assessed at Level 2, with HATEOAS documented as a future enhancement. |
| [Assignment 2](./ASSIGNMENT_2/) | Security and threat modelling | STRIDE analysis, input sanitization, local HTTPS/TLS setup, and security notes. |
| [Assignment 3](./ASSIGNMENT_3/) | Performance load testing | Express/MongoDB endpoint, optional in-memory cache, seed script, and Apache Bench test plan/results template. |
| [Assignment 4](./ASSIGNMENT_4/) | Monolith vs. microservices | Architecture diagrams, trade-off analysis, project-fit recommendation, and JWT/statelessness discussion. |
| [Assignment 5](./ASSIGNMENT_5/) | Cloud models and Docker resource limits | IaaS/PaaS/serverless comparison, Docker Compose resource constraints, and cloud documentation. |
| [Assignment 6](./ASSIGNMENT_6/) | Blue-green deployment | Two backend versions, version/health endpoints, frontend traffic switching, and rollback guidance. |
| [Assignment 7](./ASSIGNMENT_7/) | AI-assisted UI customization | AI design-suggestion API, React design lab, theme customization, `AIDESIGN.md`, and responsible-AI review. |

### Assignment-specific notes

- **A3:** Replace the results template with real Apache Bench measurements from your environment.
- **A5:** Capture a real `docker stats` screenshot if required by the lab submission.
- **A6:** Run the Compose stack and verify both blue and green endpoints before documenting the switch.
- **A7:** Configure your own OpenAI API key locally and add genuine before/after screenshots at the paths described in `ASSIGNMENT_7/AIDESIGN.md`.

The repository contains implementation code and documentation; environment-dependent measurements and screenshots should be produced from actual runs rather than represented as completed tests.

## CIE practical exam

The [CIE1 practical exam project](./CIE1_PRACTICAL_EXAM/) is maintained separately in its own folder. Refer to files inside that directory for its implementation and run instructions.

## Technology stack

- **Frontend:** React, Vite, JavaScript, CSS
- **Backend:** Node.js, Express
- **Database/ODM:** MongoDB, Mongoose
- **Authentication and security:** JWT, bcrypt, request validation/sanitization, HTTPS/TLS concepts
- **Performance:** node-cache, Apache Bench
- **DevOps:** Docker, Docker Compose, GitHub Actions
- **AI integration:** OpenAI API (server-side configuration)

Not every project uses every technology. Check the README inside the relevant folder for its actual stack and requirements.

## Getting started

### 1. Clone the repository

```bash
git clone https://github.com/kachhadiyaishan/AWDF.git
cd AWDF
```

### 2. Choose a project

Change into the folder for the practical or assignment you want to run. Read that folder's `README.md` first; projects may have separate frontend and backend directories.

### 3. Install dependencies

For a Node.js project, run `npm install` in the directory containing its `package.json`. For full-stack projects, this may need to be done separately in the frontend and backend folders.

### 4. Configure environment variables

Where an `.env.example` file exists, copy it to `.env` and supply your local configuration. Common requirements include a MongoDB connection string and, for AI-powered work, an API key. Do not commit populated `.env` files or private keys.

### 5. Run and verify

Use the commands in the project's README. For Docker projects, ensure Docker Engine/Desktop and Docker Compose are installed. Verify health endpoints, UI behavior, and test output locally before recording results.

## Configuration and security

- Never commit API keys, database credentials, JWT secrets, TLS private keys, or other secrets.
- Keep AI provider credentials on the backend; do not expose them in React/Vite client-side variables.
- Use the included `.env.example` files as configuration templates and create local `.env` files for your own environment.
- Treat AI-generated code and design suggestions as drafts. Review correctness, privacy, usability, and accessibility before applying them.
- Use development certificates only for local testing; public deployments need an appropriate trusted TLS configuration.

## Evidence and testing notes

This repository is intended to be reproducible and reviewable. Some practicals ask students to record timings, inspect browser network activity, run Docker resource commands, or capture screenshots. Such evidence should be collected from the actual environment used for the exercise. Documentation templates and checklists are not substitutes for measured results.

---

**Course:** Advanced Web Development Frameworks (ITUE301)  
**Repository owner:** [@kachhadiyaishan](https://github.com/kachhadiyaishan)  
**Repository:** [AWDF](https://github.com/kachhadiyaishan/AWDF)
