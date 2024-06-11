const Koa = require('koa');
const Router = require('@koa/router');
const serve = require('koa-static');
const path = require('path');

const app = new Koa();
const router = new Router();

// Define routes
router.get('/', async (ctx) => {
  ctx.body = 'Hello, world!';
});

// Serve static files from the frontend folder
app.use(serve(path.join(__dirname, '../frontend')));

// Use router middleware
app.use(router.routes());
app.use(router.allowedMethods());

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
