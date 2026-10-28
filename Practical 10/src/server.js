import 'dotenv/config';
import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import mongoose from 'mongoose';
import { EventEmitter } from 'node:events';

const app = express();
const PORT = Number(process.env.PORT) || 5000;
const events = new EventEmitter();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.json({ limit: '32kb' }));
const Task = mongoose.models.Task || mongoose.model('Task', new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, default: '' },
  assignedUser: { type: String, default: 'unassigned' }
}, { timestamps: true }));
const pause = ms => new Promise(resolve => setTimeout(resolve, ms));
events.on('task-created', async task => { await pause(2000); console.log('[Notification] "' + task.title + '" assigned to ' + task.assignedUser + ' at ' + new Date().toISOString()); });
events.on('task-deleted', task => console.log('[Notification] Deleted "' + task.title + '" at ' + new Date().toISOString()));
events.on('task-notification-error', error => console.error('[Notification error]', error.message));
const wrap = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
app.get('/health', (req, res) => res.json({ status: 'ok', database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected' }));
app.get('/tasks', wrap(async (req, res) => res.json({ data: await Task.find().sort({ createdAt: -1 }).lean() })));
app.post('/tasks', wrap(async (req, res) => {
  if (typeof req.body?.title !== 'string' || !req.body.title.trim()) return res.status(400).json({ message: 'Title required' });
  const task = await Task.create({ title: req.body.title.trim(), description: req.body.description || '', assignedUser: req.body.assignedUser || 'unassigned' });
  console.log('[API] Response sent at', new Date().toISOString());
  res.status(201).json({ data: task });
  setImmediate(() => events.emit('task-created', task.toObject()));
}));
app.delete('/tasks/:id', wrap(async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ message: 'Invalid task id' });
  const task = await Task.findByIdAndDelete(req.params.id);
  if (!task) return res.status(404).json({ message: 'Not found' });
  res.status(204).end(); setImmediate(() => events.emit('task-deleted', task.toObject()));
}));
app.use(express.static(path.resolve(__dirname, '../public')));
app.use((err, req, res, next) => { console.error(err); res.status(500).json({ message: 'Server error' }); });
if (process.env.NODE_ENV !== 'test') mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/awdf_practical10').then(() => app.listen(PORT, () => console.log('Event API + UI listening at http://localhost:' + PORT))).catch(err => { console.error('MongoDB connection failed:', err.message); process.exit(1); });
export default app;