const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed...');
  
  // Clear existing data
  await prisma.queueToken.deleteMany();
  await prisma.appointment.deleteMany();
  await prisma.patient.deleteMany();
  await prisma.doctor.deleteMany();
  await prisma.user.deleteMany();

  const password = await bcrypt.hash('password123', 10);

  // Users
  const admin = await prisma.user.create({
    data: { name: 'Admin', email: 'admin@haqms.com', password, role: 'ADMIN' },
  });

  const receptionist = await prisma.user.create({
    data: { name: 'Receptionist', email: 'reception1@haqms.com', password, role: 'RECEPTIONIST' },
  });

  const doctorUser = await prisma.user.create({
    data: { name: 'Dr. Smith', email: 'doctor1@haqms.com', password, role: 'DOCTOR' },
  });

  // Doctor Profile
  const doctorProfile = await prisma.doctor.create({
    data: {
      name: 'Dr. Smith',
      specialization: 'Cardiology',
      department: 'Heart Center',
      experience: 15,
      consultationFee: 200,
    },
  });

  // Patients
  const patient1 = await prisma.patient.create({
    data: {
      name: 'John Doe',
      email: 'john@example.com',
      phoneNumber: '1234567890',
      age: 45,
      gender: 'Male',
      medicalHistory: { conditions: ['Hypertension'] },
    },
  });

  const patient2 = await prisma.patient.create({
    data: {
      name: 'Clark Kent',
      email: 'clark@example.com',
      phoneNumber: '0987654321',
      age: 30,
      gender: 'Male',
      medicalHistory: null, // Null to trigger Bug F3
    },
  });

  const patient3 = await prisma.patient.create({
    data: {
      name: 'Bruce Wayne',
      email: 'bruce@example.com',
      phoneNumber: '5555555555',
      age: 35,
      gender: 'Male',
      medicalHistory: null, // Null to trigger Bug F3
    },
  });

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
