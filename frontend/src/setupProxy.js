// src/setupProxy.js

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api', // Change this to match your backend API endpoint
    createProxyMiddleware({
      target: 'http://localhost:3000', // Assuming your backend runs on port 3000
      changeOrigin: true,
    })
  );
};
