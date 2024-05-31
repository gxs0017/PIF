require('dotenv').config(); // Import dotenv to read variables from .env file
const Koa = require('koa');
const Router = require('@koa/router');
const bodyParser = require('koa-bodyparser');
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');
const serve = require('koa-static');
const cors = require('@koa/cors'); // Import the CORS middleware
const { PrismaClient } = require('@prisma/client');
const { hashPassword } = require('./passwordUtils'); // Correct import of hashPassword function

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL, // Use the DATABASE_URL from .env file
    },
  },
});

const app = new Koa();
const router = new Router();

// Enable CORS for all routes
app.use(cors());

// Middleware to parse request body
app.use(bodyParser());

// Login route with authentication and role check middleware
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

  // Respond with user information
  ctx.body = {
    message: 'Login successful',
    user: {
      email: user.email,
      role: user.role
    }
  };
});

// Serve static files from the public directory
app.use(serve(path.join(__dirname, 'public')));

// Serve the admin panel page
router.get('/admin-panel', async (ctx) => {
  const superadminPanelFilePath = path.join(__dirname, 'public', 'Superadmin-panel.js');

  // Check if the file exists
  if (!fs.existsSync(superadminPanelFilePath)) {
    ctx.status = 404;
    ctx.body = 'Superadmin-panel.js file not found';
    return;
  }

  const superadminPanelContent = fs.readFileSync(superadminPanelFilePath, 'utf8');

  ctx.type = 'text/html';
  ctx.body = `
    <html>
      <head>
        <title>Admin Panel</title>
      </head>
      <body>
        <div id="root"></div>
        <script src="/Superadmin-panel.js"></script>
      </body>
    </html>
  `;
});

// Add the router middleware to the app
app.use(router.routes());
app.use(router.allowedMethods());

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
