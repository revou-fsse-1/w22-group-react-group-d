import { useState } from "react";
import Image from "next/image";
import { SaveUser } from "@/app/types";
import { RiEdit2Fill } from "react-icons/ri";

import Heading from "../Heading";
import HeartButton from "../HeartButton";
import EditModal from "../modals/EditModal";

interface ListingHeadProps {
  title: string;
  locationValue: string;
  imageSrc: string;
  id: string;
  currentUser?: SaveUser | null;
  ownerId: string;
}

const ListingHead: React.FC<ListingHeadProps> = ({
  title,
  imageSrc,
  id,
  currentUser,
  ownerId,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
    console.log("isEditing:", isEditing);
  };

  const handleModalClose = () => {
    setIsEditing(false);
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={title} />
        {isEditing ? (
          <EditModal listingId={id} onClose={handleModalClose} />
        ) : (
          <button
            onClick={handleEditClick}
            className="p-2 rounded-md hover:bg-gray-100 focus:outline-none"
          >
            <RiEdit2Fill size={20} />
          </button>
        )}
      </div>
      <div className="w-full h-[60vh] overflow-hidden rounded-xl relative">
        <Image
          src={imageSrc}
          fill
          className="object-cover w-full"
          alt="Image"
        />
        <div className="absolute top-5 right-5">
          <HeartButton listingId={id} currentUser={currentUser} />
        </div>
      </div>
    </>
  );
};

export default ListingHead;