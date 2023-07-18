import prisma from "@/app/libs/prismadb";

export interface IListingsParams {
  userId?: string;
  guestCount?: number;
  roomCount?: number;
  category?: string;
  locationValue?: string;
}

export default async function getListings(
  params: IListingsParams
) {
  try {
    const {
      userId,
      roomCount, 
      guestCount,
      locationValue,
      category,
    } = params;

    let query: any = {};

    if (userId) {
      query.userId = userId;
    }

    if (category) {
      query.category = category;
    }

    if (roomCount) {
      query.roomCount = {
        gte: +roomCount
      }
    }

    if (guestCount) {
      query.guestCount = {
        gte: +guestCount
      }
    }

     if (locationValue) {
      query.locationValue = locationValue;
    }

    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: {
        createdAt: 'desc'
      }
    }); 
    
    //console.log(listings)
    const saveListings = listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
      }));
      
      return saveListings;
    } catch (error: any) {
      throw new Error(error);
    }
  }
