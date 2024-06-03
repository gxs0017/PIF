require('dotenv').config({ path: './.env' }); // Make sure .env file is in the same directory or adjust the path accordingly
console.log('DATABASE_URL:', process.env.DATABASE_URL); // Verify the environment variable

const { PrismaClient } = require('@prisma/client');
const { hashPassword } = require('./passwordUtils'); // Correct import of hashPassword function
const prisma = new PrismaClient();

async function main() {
  try {
    // Create a new user with the specified email, password, and role
    const hashedPassword = await hashPassword('qwerty123'); // Hash the password
    await prisma.user.create({
      data: {
        email: 'jaisharma@gmail.com',
        password: hashedPassword,
        role: 'SUPERADMIN', // Set the role to Superadmin
      },
    });
    console.log('Superadmin user created successfully.');
  } catch (error) {
    console.error('Error creating superadmin user:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
