# Practical 1 — Student Portfolio (React + Vite)

A responsive, single-page student portfolio built for **Advanced Web Development Frameworks (ITUE301)**. It demonstrates Vite setup, functional React components, JSX, props, reusable UI, and component composition.

## Requirements covered
- `Header`, `About`, `Skills`, and `Footer` are independent components.
- `NavBar` highlights the currently visible section.
- `Skills` receives an array through the `skillList` prop and renders it dynamically.
- `Header` receives `name` and `themeColor` props; the theme color is applied inline.
- `Projects` displays three sample projects.
- Responsive layout, semantic sections, and a `.gitignore` that excludes `node_modules`.

## Run locally
Prerequisites: Node.js 18+ and npm.

```bash
cd "PRACTICAL 1/student-portfolio"
npm install
npm run dev
```

Open the local URL printed by Vite (usually http://localhost:5173).

## Customize
Edit the profile, skill list, projects, email, and links in `src/App.jsx`. Replace the sample profile details and project descriptions with your own work before submission.

## Component tree
```text
App
├── NavBar
├── Header
├── About
├── Skills
├── Projects
└── Footer
```

## Key concepts
- **Props** pass data from a parent component to children.
- **Reusable components** keep responsibilities separate and reduce duplication.
- React re-renders a component when its props or state change; here, props determine the header content, theme color, and skill list.
