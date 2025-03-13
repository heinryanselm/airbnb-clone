const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function main() {
  // Create a test user
  const user = await prisma.user.upsert({
    where: { email: "test@example.com" },
    update: {},
    create: {
      email: "test@example.com",
      name: "Test User",
      hashedPassword: await bcrypt.hash("password123", 12),
    },
  });

  console.log("Created user:", user);

  // Create some sample listings
  const listing1 = await prisma.listing.create({
    data: {
      title: "Beach Villa",
      description: "Beautiful villa on the beach",
      imageSrc:
        "https://res.cloudinary.com/your-cloud-name/image/upload/v1234567890/sample-image.jpg",
      category: "Beach",
      roomCount: 3,
      bathroomCount: 2,
      guestCount: 6,
      locationValue: "US", // Country code
      userId: user.id,
      price: 150,
    },
  });

  const listing2 = await prisma.listing.create({
    data: {
      title: "Mountain Cabin",
      description: "Cozy cabin in the mountains",
      imageSrc:
        "https://res.cloudinary.com/your-cloud-name/image/upload/v1234567890/sample-image2.jpg",
      category: "Countryside",
      roomCount: 2,
      bathroomCount: 1,
      guestCount: 4,
      locationValue: "CA", // Country code
      userId: user.id,
      price: 100,
    },
  });

  console.log("Created listings:", { listing1, listing2 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
 