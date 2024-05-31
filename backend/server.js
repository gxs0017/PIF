require('dotenv').config(); // Import dotenv to read variables from .env file
const Koa = require('koa');
const Router = require('@koa/router');
const bodyParser = require('koa-bodyparser');
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');

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

// Serve static files from the frontend folder
app.use(async (ctx, next) => {
  if (ctx.path === '/admin-panel') {
    // Read the Superadmin-panel.js file
    const superadminPanelFilePath = path.join(__dirname, 'Superadmin-panel.js');
    const superadminPanelContent = fs.readFileSync(superadminPanelFilePath, 'utf8');

    // Render the Superadmin-panel.js component and send it as HTML
    ctx.type = 'text/html';
    ctx.body = `
      <html>
        <head>
          <title>Admin Panel</title>
        </head>
        <body>
          <div id="root"></div>
          <script>${superadminPanelContent}</script>
        </body>
      </html>
    `;
  } else {
    await next();
  }
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
