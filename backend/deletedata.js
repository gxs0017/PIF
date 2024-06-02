const { PrismaClient } = require('@prisma/client');

async function deleteData() {
  const prisma = new PrismaClient();

  try {
    // Connect to the database
    await prisma.$connect();

    // Delete all rows from the User table
    await prisma.user.deleteMany();

    console.log('Deleted all data from the User table.');
  } catch (error) {
    console.error('Error deleting data:', error);
  } finally {
    // Disconnect from the database
    await prisma.$disconnect();
  }
}

// Call the deleteData function
deleteData();
