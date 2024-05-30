const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  try {
    // Create a new user with the SUPERADMIN role
    await prisma.user.create({
      data: {
        email: 'superadmin@example.com', // Specify the email of the superadmin user
        password: 'superadmin_password', // Specify the password of the superadmin user
        role: 'SUPERADMIN',
      },
    });
    
    console.log('Superadmin user created successfully!');
  } catch (error) {
    console.error('Error creating superadmin user:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
