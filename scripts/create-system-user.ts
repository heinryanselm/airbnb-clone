const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

// Define interfaces for better type safety
interface ListingWithId {
  id: string;
  userId?: string | null;
}

async function createSystemUser() {
  try {
    // Check if system user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: "system@example.com" },
    });

    if (existingUser) {
      console.log("System user already exists with ID:", existingUser.id);
      return existingUser.id;
    }

    // Create a system user
    const systemUser = await prisma.user.create({
      data: {
        email: "system@example.com",
        name: "System User",
        hashedPassword: await bcrypt.hash("strongSystemPassword", 12),
      },
    });

    console.log("Created system user with ID:", systemUser.id);
    return systemUser.id;
  } catch (error) {
    console.error("Error creating system user:", error);
  }
}

async function updateListingsWithSystemUser() {
  try {
    const systemUserId = await createSystemUser();

    if (!systemUserId) {
      console.error("Failed to get system user ID");
      return;
    }

    // First, find all listings where userId field is missing or empty
    const allListings = await prisma.listing.findMany({
      select: { id: true, userId: true },
    });

    // Filter listings that need a userId (with proper typing)
    const listingsToUpdate = allListings.filter(
      (listing: ListingWithId) =>
        !listing.userId || listing.userId === "" || listing.userId === null
    );

    console.log(`Found ${listingsToUpdate.length} listings that need a userId`);

    // Update each listing individually
    let updatedCount = 0;
    for (const listing of listingsToUpdate) {
      await prisma.listing.update({
        where: { id: listing.id },
        data: { userId: systemUserId },
      });
      updatedCount++;
    }

    console.log(`Updated ${updatedCount} listings with system user ID`);
  } catch (error) {
    console.error("Error updating listings:", error);
  } finally {
    await prisma.$disconnect();
  }
}

updateListingsWithSystemUser();
