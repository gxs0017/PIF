require('dotenv').config();
const Koa = require('koa');
const Router = require('@koa/router');
const bodyParser = require('koa-bodyparser');
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');
const serve = require('koa-static');
const cors = require('@koa/cors');
const { PrismaClient } = require('@prisma/client');
const { hashPassword } = require('./passwordUtils');
const jwt = require('koa-jwt');
const jsonwebtoken = require('jsonwebtoken');

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

const app = new Koa(); // Define app here

const router = new Router();

// Enable CORS for all routes
app.use(cors());

// Middleware to parse request body
app.use(bodyParser());

router.post('/signup', async (ctx) => {
  const { email, password } = ctx.request.body;

  if (!email || !password) {
    ctx.status = 400;
    ctx.body = { message: 'Email and password are required' };
    return;
  }

  const hashedPassword = await hashPassword(password);
  await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      role: 'USER',
    },
  });

  ctx.status = 201;
  ctx.body = { message: 'User created successfully' };
});

// Middleware to protect routes
const authMiddleware = jwt({ secret: process.env.JWT_SECRET });

router.get('/sadmin-panel', authMiddleware, async (ctx) => {
  // Serve the Sadmin Panel HTML file
  ctx.type = 'text/html';
  ctx.body = fs.createReadStream(path.join(__dirname, 'public', 'sadmin-panel.html'));
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
  if (!isPasswordValid) {
    ctx.status = 401;
    ctx.body = { message: 'Invalid email or password' };
    return;
  }

  try {
    const token = jsonwebtoken.sign({ email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Respond with user information and token
    ctx.body = {
      message: 'Login successful',
      user: {
        email: user.email,
        role: user.role,
      },
      token,
    };
  } catch (err) {
    console.error('Error generating JWT:', err);
    ctx.status = 500;
    ctx.body = { message: 'Internal server error' };
  }
});

// Serve static files from the public directory
app.use(serve(path.join(__dirname, 'public')));

// Add the router middleware to the app
app.use(router.routes());
app.use(router.allowedMethods());

// Start the server
const port = process.env.PORT || 3000; // Change port to 3000
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
