import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import tasksRouter from './tasks.routes.js';
import { notFoundHandler, errorHandler } from './middleware/errorHandlers.js';

const app = express();
const PORT = Number(process.env.PORT) || 5000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.resolve(__dirname, '../public');

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});
app.use(express.json({ limit: '32kb' }));
app.use((req, res, next) => {
  if (['POST', 'PUT'].includes(req.method) && !req.is('application/json')) {
    return res.status(415).json({ error: { code: 'UNSUPPORTED_MEDIA_TYPE', message: 'POST and PUT requests must use Content-Type: application/json.' } });
  }
  next();
});
app.get('/health', (req, res) => res.status(200).json({ status: 'ok', service: 'task-manager-api' }));
app.use('/tasks', tasksRouter);
app.use(express.static(publicDir));
app.use(notFoundHandler);
app.use(errorHandler);

if (process.env.NODE_ENV !== 'test') app.listen(PORT, () => console.log(`Task Manager API and UI listening at http://localhost:${PORT}`));
export default app;