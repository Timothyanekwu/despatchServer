/**
 * 404 catch-all middleware.
 * Placed after all route definitions.
 */
const notFound = (req, res, _next) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
};

export default notFound;
