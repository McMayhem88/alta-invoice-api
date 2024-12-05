import {PrismaClient, User} from "@prisma/client";
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const vendorNames = [
  'Test Solutions',
  'Test Technologies',
  'Test Innovations',
  'Test Industries',
  'Test Enterprises',
  'Test Holdings',
  'Test Inc.'
]

const getRandomVendor = () => {
  const index = Math.floor(Math.random() * vendorNames.length);
  return vendorNames[index];
}

const getRandomDate = () => {
  const startTime = new Date(2024, 10, 1).getTime();
  const endTime = new Date(2026, 0, 1).getTime();
  const totalTime = startTime + Math.random() * (endTime - startTime);
  return new Date(totalTime);
}

const getRandomAmount = (min: number, max: number) : number => {
  const minCents = Math.ceil(min * 100);
  const maxCents = Math.floor(max * 100);
  const totalCents = Math.floor(Math.random() * (maxCents - minCents + 1)) + minCents;
  return totalCents / 100;
}

async function generateRandomInvoice(user: User, dueDate?: string, vendorName?: string)  {

  let date = getRandomDate();
  if (dueDate) {
    date = new Date(date);
  }
  
  let vendor = getRandomVendor();
  if (vendorName) {
    vendor = vendorName;
  }
  
  await prisma.invoice.create({
    data: {
      vendor_name: vendor,
      amount: getRandomAmount(200, 15000),
      due_date: date,
      description: 'Test description',
      user_id: user.id
    }
  })
}

async function main() {
  // Create hashed password to use for the main user
  const password = await bcrypt.hash('test1234', 10);
  
  // Set up the main user
  const user = await prisma.user.upsert({
    where: {email: 'test@test.com'},
    update: {},
    create: {
      email: 'test@test.com',
      password,
      name: 'Test Person',
    },
  });
  
  // Generate invoices that are guaranteed to be aggregated
  await prisma.invoice.createMany({
    data: [
      {
        vendor_name: 'Test Vendor',
        amount: getRandomAmount(200, 50000),
        due_date: new Date('2025-05-01'),
        description: 'Aggregated invoice test',
        user_id: user.id
      },
      {
        vendor_name: 'Test Vendor',
        amount: getRandomAmount(200, 50000),
        due_date: new Date('2025-05-01'),
        description: 'Aggregated invoice test',
        user_id: user.id
      },
      {
        vendor_name: 'Test Vendor',
        amount: getRandomAmount(200, 50000),
        due_date: new Date('2025-05-01'),
        description: 'Aggregated invoice test',
        user_id: user.id
      }
    ]
  });
  
  // Generate several more invoices with randomized values
  //const count = Math.floor(Math.random() * (4 - 2 + 1) + 2); // Generate 2-4 random invoices
  const count = 15; // Set this to a high number for pagination
  for (let i = 0; i < count; i++) {
    await generateRandomInvoice(user);
  }
  
  console.log(`Seeded ${count + 3} invoices and 1 user with ID: ${user.id}`);
  
}


main()
  .catch(error => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });