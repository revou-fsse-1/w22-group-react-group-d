import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface ListingData {
  title: string;
  description: string;
  imageSrc: string;
  category: string;
  roomCount: number;
  guestCount: number;
  location: { value: string };
  price: number;
}

interface IParams {
  listingId?: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { listingId } = params;

  if (!listingId || typeof listingId !== 'string') {
    throw new Error('Invalid ID');
  }

  const listing = await prisma.listing.deleteMany({
    where: {
      id: listingId,
      userId: currentUser.id
    }
  });

  return NextResponse.json(listing);
}

export async function PUT(
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { listingId } = params;

  if (!listingId || typeof listingId !== "string") {
    throw new Error("Invalid ID");
  }

  const body: ListingData = await request.json();

  // Use body.title, body.description, etc. to update the listing
  const updatedListing = await prisma.listing.update({
    where: {
      id: listingId,
    },
    data: {
      title: body.title,
      description: body.description,
      imageSrc: body.imageSrc,
      category: body.category,
      roomCount: body.roomCount,
      guestCount: body.guestCount,
      locationValue: body.location.value,
      price: body.price,
    },
  });

  return NextResponse.json(updatedListing);
}