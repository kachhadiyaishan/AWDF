# Practical 3 — API Integration & Data Rendering

A React + Vite repository explorer consuming GitHub's public REST API with loading, success, empty, and error states.

## Features
- Fetches repositories from `https://api.github.com/users/{username}/repos` using `useEffect`.
- Loading skeleton, error message, and retry action.
- Search/filter by repository name.
- Shows repository name, description, URL, language, and star/fork counts.
- Configurable GitHub username, responsive UI, and AbortController cleanup.

## Run
```bash
cd "Practical 3/repository-explorer"
npm install
npm run dev
```
Default username: `facebook`. Change it to inspect another public account. GitHub unauthenticated API rate limits apply.

## Why useEffect?
Fetching is a side effect. Running it in the component body would trigger a request on every render; the effect and its dependencies control when it runs.
