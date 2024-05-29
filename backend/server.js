const Koa = require('koa');
const Router = require('@koa/router');
const bodyParser = require('koa-bodyparser');
const { PrismaClient } = require('@prisma/client');
const axios = require('axios');
const serve = require('koa-static');
const path = require('path');

const app = new Koa();
const router = new Router();
const prisma = new PrismaClient();

app.use(bodyParser());

// Define routes
router.get('/', async (ctx) => {
  ctx.body = 'Hello, world!';
});

router.post('/login', async (ctx) => {
  const { email, password } = ctx.request.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (user && user.password === password) {
    ctx.body = { message: 'Login successful', role: user.role };
  } else {
    ctx.status = 401;
    ctx.body = { message: 'Invalid email or password' };
  }
});

router.post('/signup', async (ctx) => {
  const { email, password, role } = ctx.request.body;
  const user = await prisma.user.create({
    data: {
      email,
      password,
      role: role || 'USER'
    }
  });
  ctx.body = user;
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
