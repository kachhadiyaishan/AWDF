import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import api from './routes/api.js';
import { requestLogger } from './middleware/requestLogger.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';

const app = express();
app.use(cors({ origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173' }));
app.use(express.json({ limit: '1mb' }));
app.use(requestLogger);
app.get('/health', (req, res) => res.json({ status: 'ok' }));
app.use('/api/v1', api);
app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000;
try {
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/cie1_leave_management');
  app.listen(port, () => console.log(`Leave API listening on http://localhost:${port}`));
} catch (err) {
  console.error('MongoDB connection failed:', err.message);
  process.exit(1);
}
