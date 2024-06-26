// server.js

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
const jwt = require('koa-jwt');
const jsonwebtoken = require('jsonwebtoken');
const { hashPassword } = require('./passwordUtils');

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

const app = new Koa();
const router = new Router();

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser()); // Parse request body
app.use(serve(path.join(__dirname, 'public'))); // Serve static files from 'public' directory

// Routes
router.post('/api/signin', async (ctx) => {
  const { email, password } = ctx.request.body;
  if (!email || !password) {
    ctx.status = 400;
    ctx.body = { message: 'Email and password are required' };
    return;
  }

  try {
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

    const token = jsonwebtoken.sign(
      { email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    ctx.body = {
      message: 'Login successful',
      user: {
        email: user.email,
        role: user.role,
      },
      token,
    };
  } catch (error) {
    console.error('Sign In error:', error);
    ctx.status = 500;
    ctx.body = { message: 'Internal server error' };
  }
});

const authMiddleware = jwt({ secret: process.env.JWT_SECRET });

router.get('/sadmin-panel', authMiddleware, async (ctx) => {
  ctx.type = 'text/html';
  ctx.body = fs.createReadStream(path.join(__dirname, 'public', 'sadmin-panel.html'));
});

router.get('/current-user', authMiddleware, async (ctx) => {
  try {
    const token = ctx.request.headers.authorization.split(' ')[1];
    const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
    const user = await prisma.user.findUnique({
      where: { email: decoded.email },
    });

    if (!user) {
      ctx.status = 404;
      ctx.body = { message: 'User not found' };
      return;
    }

    ctx.body = { email: user.email, name: user.name };
  } catch (error) {
    console.error('Error retrieving current user:', error);
    ctx.status = 500;
    ctx.body = { message: 'Internal server error' };
  }
});

// Router middleware
app.use(router.routes());
app.use(router.allowedMethods());

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
