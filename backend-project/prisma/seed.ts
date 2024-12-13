/*
 ===============================================================================
 Database Seeding Script
 ===============================================================================
 */
import {PrismaClient, User} from "@prisma/client";
import * as bcrypt from 'bcryptjs';

// Pull a reference to the PrismaClient to allow for database interaction through the ORM
const prisma = new PrismaClient();

/**
 * List of names to randomly choose from when creating dummy invoices for vendors
 */
const vendorNames = [
  'Test Solutions',
  'Test Technologies',
  'Test Innovations',
  'Test Industries',
  'Test Enterprises',
  'Test Holdings',
  'Test Inc.'
]

/**
 * Returns a random vendor name for use with a generated invoice
 */
const getRandomVendor = () => {
  const index = Math.floor(Math.random() * vendorNames.length);
  return vendorNames[index];
}

/**
 * Returns a random date for use with a generated invoice
 */
const getRandomDate = () => {
  const startTime = new Date(2024, 10, 1).getTime();
  const endTime = new Date(2026, 0, 1).getTime();
  const totalTime = startTime + Math.random() * (endTime - startTime);
  return new Date(totalTime);
}

/**
 * Returns a random invoice amount between the provided `min` and `max` amounts
 * @param min Minimum dollar amount for the invoice
 * @param max Maximum dollar amount for the invoice
 */
const getRandomAmount = (min: number, max: number) : number => {
  //@@ This was meant to show an alternate method (other than using `decimal.js`) to get around the floating-point
  //@@ math inaccuracy problems.
  const minCents = Math.ceil(min * 100);
  const maxCents = Math.floor(max * 100);
  const totalCents = Math.floor(Math.random() * (maxCents - minCents + 1)) + minCents;
  return totalCents / 100;
}

/**
 * Returns a random invoice with optional set `dueDate` and `vendorName`
 * @param user The user this invoice belongs to
 * @param dueDate (optional) The due date of the invoice, defaults to a random date
 * @param vendorName (optional) The vendor name for the invoice, defaults to a randomly selected name
 */
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
  // @@ This was done to meet the requirement that one of the endpoints shows aggregated invoice totals by due date
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
  //const count = Math.floor(Math.random() * (4 - 2 + 1) + 2); // Generate 2-4 random invoices //!! Originally wanted to generate only a few invoices, but that would have prevented demonstration of pagination
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