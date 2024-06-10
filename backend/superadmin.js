const { PrismaClient } = require('@prisma/client');
const { hashPassword } = require('./passwordUtils'); // Correct import of hashPassword function

const prisma = new PrismaClient();

async function main() {
  try {
    // Hash the password
    const hashedPassword = await hashPassword('qwerty123');

    // Create users with different roles
    await prisma.user.createMany({
      data: [
        {
          email: 'test@gmail.com',
          password: hashedPassword,
          role: 'USER',
        },
        {
          email: 'dealer@gmail.com',
          password: hashedPassword,
          role: 'DEALER',
        },
        {
          email: 'team@gmail.com',
          password: hashedPassword,
          role: 'TEAM',
        },
        {
          email: 'jaisharma@gmail.com',
          password: hashedPassword,
          role: 'SADMIN',
        },
      ],
    });

    console.log('Users created successfully.');
  } catch (error) {
    console.error('Error creating users:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
