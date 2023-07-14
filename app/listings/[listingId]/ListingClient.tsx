'use client';

import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import useLoginModal from "@/app/hooks/useLoginModal";
import { SaveListing, 
  // SaveReservation, 
  SaveUser } from "@/app/types";

import Container from "@/app/components/Container";
import { categories } from "@/app/components/navbar/Categories";
import ListingHead from "@/app/components/listings/ListingHead";
import ListingInfo from "@/app/components/listings/ListingInfo";
// import ListingReservation from "@/app/components/listings/ListingReservation";

interface ListingClientProps {
  // reservations?: SaveReservation[];
  listing: SaveListing & {
    user: SaveUser;
  };
  currentUser?: SaveUser | null;
}

const ListingClient: React.FC<ListingClientProps> = ({
  listing,
  currentUser
}) => {
  const loginModal = useLoginModal();
  const router = useRouter();

  const category = useMemo(() => {
     return categories.find((items) => 
      items.label === listing.category);
  }, [listing.category]);

  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing.price);

  // const onCreateReservation = useCallback(() => {
  //     if (!currentUser) {
  //       return loginModal.onOpen();
  //     }
  //     setIsLoading(true);
  // },
  // [
  //   totalPrice, 
  //   listing?.id,
  //   router,
  //   currentUser,
  //   loginModal
  // ]);

  useEffect(() => {
      if (listing.price === 0) {
        setTotalPrice(0);
      } else {
        setTotalPrice(listing.price);
      }
    }, [listing.price]);

  return ( 
    <Container>
      <div 
        className="
          max-w-screen-lg 
          mx-auto
        "
      >
        <div className="flex flex-col gap-6">
          <ListingHead
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
            id={listing.id}
            currentUser={currentUser}
          />
          <div 
            className="
              grid 
              grid-cols-1 
              md:grid-cols-7 
              md:gap-10 
              mt-6
            "
          >
            <ListingInfo
              user={listing.user}
              category={category}
              description={listing.description}
              roomCount={listing.roomCount}
              guestCount={listing.guestCount}
            />
            <div 
              className="
                order-first 
                mb-10 
                md:order-last 
                md:col-span-3
              "
            >
              {/* <ListingReservation
                price={listing.price}
                totalPrice={totalPrice}
                onSubmit={onCreateReservation}
                disabled={isLoading}
              /> */}
            </div>
          </div>
        </div>
      </div>
    </Container>
   );
}
 
export default ListingClient;
