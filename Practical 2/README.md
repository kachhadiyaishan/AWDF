# Practical 2 — State Management & Routing in React

A polished multi-page extension of the student portfolio using React Router and React state.

## Features
- Home, Projects, Contact, About, and custom 404 routes.
- React Router `Link` / `NavLink` for navigation without full page reloads.
- Dark/light theme toggle powered by `useState`.
- Controlled contact form with live preview and character count.
- Help tip visibility toggle demonstrating a second state variable.
- Responsive layout and accessible labels.

## Run
```bash
cd "Practical 2/student-portfolio"
npm install
npm run dev
```
Node.js 18+ recommended. Vite prints the local URL.

## Concepts
`BrowserRouter` is installed once in `main.jsx`; `App.jsx` declares routes. State represents values that change during interaction, while props pass data between components.
