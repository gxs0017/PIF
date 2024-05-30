require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    console.log('DATABASE_URL:', process.env.DATABASE_URL); // Add this line to debug

    // Create a new user with the SUPERADMIN role
    await prisma.user.create({
      data: {
        email: 'superadmin@example.com',
        password: 'superadminpassword',
        role: 'SUPERADMIN',
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
