import { NextRequest, NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
  listingId?: string;
}

/**
 * POST handler to add a listing to user's favorites
 * @param request - The incoming request object
 * @param context - The context object containing route parameters
 * @returns JSON response with updated user data or error
 */
export async function POST(
  request: NextRequest,
  { params }: { params: IParams }
) {
  // Get the current authenticated user
  const currentUser = await getCurrentUser();

  // Return error if no authenticated user
  if (!currentUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Extract the listing ID from route parameters
  const { listingId } = params;

  // Validate the listing ID
  if (!listingId || typeof listingId !== "string") {
    throw new Error("Invalid ID");
  }

  // Create a copy of the user's favorite IDs array
  let favoriteIds = [...(currentUser.favoriteIds || [])];

  // Add the new listing ID to favorites
  favoriteIds.push(listingId);

  // Update the user in the database with the new favorites list
  const user = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favoriteIds,
    },
  });

  // Return the updated user data
  return NextResponse.json(user);
}

/**
 * DELETE handler to remove a listing from user's favorites
 * @param request - The incoming request object
 * @param context - The context object containing route parameters
 * @returns JSON response with updated user data or error
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: IParams }
) {
  // Get the current authenticated user
  const currentUser = await getCurrentUser();

  // Return error if no authenticated user
  if (!currentUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Extract the listing ID from route parameters
  const { listingId } = params;

  // Validate the listing ID
  if (!listingId || typeof listingId !== "string") {
    throw new Error("Invalid ID");
  }

  // Create a copy of the user's favorite IDs array
  let favoriteIds = [...(currentUser.favoriteIds || [])];

  // Filter out the listing ID to be removed
  favoriteIds = favoriteIds.filter((id) => id !== listingId);

  // Update the user in the database with the new favorites list
  const user = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favoriteIds,
    },
  });

  // Return the updated user data
  return NextResponse.json(user);
}
