const Koa = require('koa');
const Router = require('@koa/router');
const bodyParser = require('koa-bodyparser');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
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
  if (!email || !password) {
    ctx.status = 400;
    ctx.body = { message: 'Email and password are required' };
    return;
  }
  
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    ctx.status = 401;
    ctx.body = { message: 'Invalid email or password' };
    return;
  }
  
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (isPasswordValid) {
    ctx.body = { message: 'Login successful', role: user.role };
  } else {
    ctx.status = 401;
    ctx.body = { message: 'Invalid email or password' };
  }
});

router.post('/signup', async (ctx) => {
  const { email, password, role } = ctx.request.body;
  const hashedPassword = await hashPassword(password);
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
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

async function hashPassword(password) {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}
