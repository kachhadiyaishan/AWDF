# Practical 8 — Performance Optimization and Lazy Loading
React route-level code splitting with `React.lazy()` and `Suspense`.

Run: `npm install && npm run dev`; build: `npm run build`. Visit Home, Projects, Contact. Projects and Contact are separate lazy chunks. Inspect `dist/assets`, then use DevTools → Network with cache disabled and Slow 3G to observe on-demand chunk downloads and the fallback UI. Record your own before/after bundle size and timings; they depend on your machine/network, so no fabricated measurements are included.