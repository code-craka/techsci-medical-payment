const { PrismaClient } = require('@prisma/client');
const { hash } = require('bcrypt');

const prisma = new PrismaClient();

async function createAdminUser() {
  const username = 'admin';
  const password = 'Admin@123'; // You should change this after first login
  
  try {
    const hashedPassword = await hash(password, 10);
    
    const user = await prisma.user.upsert({
      where: { username },
      update: {},
      create: {
        username,
        password: hashedPassword,
        role: 'ADMIN',
        email: 'admin@example.com',
        name: 'System Admin',
        twoFactorEnabled: false
      },
    });

    console.log('Admin user created successfully:', {
      id: user.id,
      username: user.username,
      role: user.role
    });
  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createAdminUser();
