'use client';

import dynamic from "next/dynamic";
import { IconType } from "react-icons";
import { SaveUser } from "@/app/types";

import Avatar from "../Avatar";
import ListingCategory from "./ListingCategory";
import Request from "./ListingRequest";
import { useState } from "react";

interface ListingInfoProps {
  user: SaveUser,
  description: string;
  guestCount: number;
  roomCount: number;
  category: {
    icon: IconType,
    label: string;
    description: string;
  } | undefined
}

const ListingInfo: React.FC<ListingInfoProps> = ({
  user,
  description,
  guestCount,
  roomCount,
  category,
}) => {
  const [isAdditionalRequestModalOpen, setAdditionalRequestModalOpen] = useState(false);
  const [typeOfRequest, setTypeOfRequest] = useState("interior");
  const [requestDescription, setRequestDescription] = useState("");

  const handleOpenAdditionalRequestModal = () => {
    setAdditionalRequestModalOpen(true);
  };

  const handleCloseAdditionalRequestModal = () => {
    setAdditionalRequestModalOpen(false);
  };

  const handleTypeOfRequestChange = (value: string) => {
    setTypeOfRequest(value);
  };

  const handleDescriptionChange = (value: string) => {
    setRequestDescription(value);
  };

  const handleAdditionalRequestSubmit = () => {
    // Handle the submission logic here
    console.log("Type of Request:", typeOfRequest);
    console.log("Request Description:", requestDescription);
    handleCloseAdditionalRequestModal();
  };
  return ( 
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div 
          className="
            text-xl 
            font-semibold 
            flex 
            flex-row 
            items-center
            gap-2
          "
        >
          <div>Hosted by {user?.name}</div>
          <Avatar src={user?.image} />
        </div>
        <div className="
            flex 
            flex-row 
            items-center 
            gap-4 
            font-light
            text-neutral-500
          "
        >
          <div>
            {guestCount} guests
          </div>
          <div>
            {roomCount} rooms
          </div>
        </div>
      </div>
      <hr />
      {category && (
        <ListingCategory
          icon={category.icon} 
          label={category?.label}
          description={category?.description} 
        />
      )}
      <hr />
      <div className="
      text-lg font-light text-neutral-500">
        {description}
      </div>

      {/* Additional Request Button */}
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
        onClick={handleOpenAdditionalRequestModal}
      >
        Additional Request
      </button>

      {/* Additional Request Modal */}
      <Request
        isOpen={isAdditionalRequestModalOpen}
        onClose={handleCloseAdditionalRequestModal}
        onSubmit={handleAdditionalRequestSubmit}
        title="Additional Request"
        actionLabel="Submit"
        typeOfRequest={typeOfRequest}
        onTypeOfRequestChange={handleTypeOfRequestChange}
        description={requestDescription}
        onDescriptionChange={handleDescriptionChange}
      />

    </div>
   );
}
 
export default ListingInfo;