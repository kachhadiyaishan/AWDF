export function requestLogger(req, res, next) {
  const startedAt = Date.now();
  res.on('finish', () => {
    console.log(JSON.stringify({
      method: req.method, path: req.originalUrl, status: res.statusCode,
      durationMs: Date.now() - startedAt, at: new Date().toISOString()
    }));
  });
  next();
}
