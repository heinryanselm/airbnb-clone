// Use require instead of import
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function addDefaultValues() {
  try {
    // Update all existing listings with default values for new fields
    const result = await prisma.listing.updateMany({
      where: {},
      data: {
        originalListingUrl: null,
        condition: "move-in-ready",
        sourceWebsite: "direct-listing",
        lastUpdated: new Date(),
        contactInfo: null,
        location: null,
        region: null,
        agentName: null,
      },
    });

    console.log(`Updated ${result.count} listings with default values`);
  } catch (error) {
    console.error("Error updating listings:", error);
  } finally {
    await prisma.$disconnect();
  }
}

// Execute the function
addDefaultValues();
