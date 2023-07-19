"use client";

import { toast } from "react-hot-toast";
import axios from "axios";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

import { SaveListing, SaveUser } from "@/app/types";

import Heading from "@/app/components/Heading";
import Container from "@/app/components/Container";
import ListingCard from "@/app/components/listings/ListingCard";
import EditModal from "../components/modals/EditModal";
import useEditModal from "../hooks/useEditModal";

interface PropertiesClientProps {
  listings: SaveListing[];
  currentUser?: SaveUser | null;
}

const PropertiesClient: React.FC<PropertiesClientProps> = ({
  listings,
  currentUser,
}) => {
  const router = useRouter();

  const [selectedListingId, setSelectedListingId] = useState<string | null>(
    null
  );
  const [deletingId, setDeletingId] = useState("");
  const { isOpen, openModal, closeModal } = useEditModal({
    onClose: () => setSelectedListingId(null),
  });

  const onDelete = useCallback(
    (id: string) => {
      setDeletingId(id);

      axios
        .delete(`/api/listings/${id}`)
        .then(() => {
          toast.success("Listing deleted");
          router.refresh();
        })
        .catch((error) => {
          toast.error(error?.response?.data?.error);
        })
        .finally(() => {
          setDeletingId("");
        });
    },
    [router]
  );

  const handleEdit = (id: string) => {
    setSelectedListingId(id); // Store the selected listing ID
    openModal(); // Open the EditModal with the selected listing ID
  };

  return (
    <Container>
      <Heading title="Properties" subtitle="List of your properties" />
      {/* Rendering the ListingCard components */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings.map((listing: any) => (
          <ListingCard
            key={listing.id}
            data={listing}
            actionId={listing.id}
            onAction={onDelete}
            onEdit={() => handleEdit(listing.id)} // Call handleEdit with the listing ID
            disabled={deletingId === listing.id}
            actionLabel="Delete"
            currentUser={currentUser}
          />
        ))}
      </div>
      {/* Rendering the EditModal */}
      <EditModal
        listingId={selectedListingId || ""}
        isOpen={isOpen} // Pass the isOpen state variable to EditModal
        closeModal={closeModal} // Pass the closeModal function to EditModal
        onClose={() => setSelectedListingId(null)} // Pass the onClose function to EditModal
      />
    </Container>
  );
};

export default PropertiesClient;
