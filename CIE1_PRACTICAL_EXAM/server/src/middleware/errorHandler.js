export function notFound(req, res, next) {
  res.status(404).json({ error: { code: 'NOT_FOUND', message: `Route ${req.method} ${req.originalUrl} was not found.` } });
}

export function errorHandler(err, req, res, next) {
  if (res.headersSent) return next(err);
  if (err.name === 'ValidationError') {
    const details = Object.values(err.errors).map(item => ({ field: item.path, message: item.message }));
    return res.status(400).json({ error: { code: 'VALIDATION_ERROR', message: 'Please correct the submitted data.', details } });
  }
  if (err.code === 11000) {
    return res.status(409).json({ error: { code: 'DUPLICATE_VALUE', message: 'A record with that value already exists.' } });
  }
  const status = err.status || 500;
  res.status(status).json({ error: {
    code: err.code || 'INTERNAL_ERROR',
    message: status === 500 ? 'An unexpected server error occurred.' : err.message
  }});
}
