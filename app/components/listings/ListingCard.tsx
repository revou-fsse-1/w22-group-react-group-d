"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import useCountries from "@/app/hooks/useCountries";
import { FaEdit, FaTrash } from "react-icons/fa";

import { SaveListing, SaveUser } from "@/app/types";

import HeartButton from "../HeartButton";

interface ListingCardProps {
  data: SaveListing;
  onAction?: (id: string) => void;
  onEdit?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: SaveUser | null;
}

const ListingCard: React.FC<ListingCardProps> = ({
  data,
  onAction,
  onEdit,
  disabled,
  actionLabel,
  actionId = "",
  currentUser,
}) => {
  const router = useRouter();

  const { getByValue } = useCountries();

  const location = getByValue(data.locationValue);

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled) {
        return;
      }

      onAction?.(actionId);
    },
    [disabled, onAction, actionId]
  );

  const price = useMemo(() => {
    return data.price;
  }, [, data.price]);

  return (
    <div
      onClick={() => router.push(`/listings/${data.id}`)}
      className="col-span-1 mt-10 cursor-pointer group"
    >
      <div className="flex flex-col gap-2 w-full">
        <div
          className="
            aspect-square 
            w-full 
            relative 
            overflow-hidden 
            rounded-xl
          "
        >
          <Image
            fill
            className="
              object-cover 
              h-full 
              w-full 
              group-hover:scale-110 
              transition
            "
            src={data.imageSrc}
            alt="Listing"
          />
          <div
            className="
            absolute
            top-3
            right-3
          "
          >
            <HeartButton listingId={data.id} currentUser={currentUser} />
          </div>
        </div>
        <div className="font-semibold text-lg">{data.title}</div>
        <div className="font-semibold text-lg">
          {location?.region}, {location?.label}
        </div>
        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold">$ {price}</div>
        </div>
        <div className="flex flex-row items-center justify-between mt-2">
          <div className="flex items-center gap-2">
            {currentUser && currentUser.id === data.userId && onEdit && (
              <button
                className="flex items-center text-sm text-gray-500 hover:text-gray-700 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(data.id);
                }}
              >
                <FaEdit />
                <span>Edit</span>
              </button>
            )}
            {onAction && actionLabel && (
              <button
                className="flex items-center text-sm text-red-500 hover:text-red-700 cursor-pointer"
                onClick={handleCancel}
                disabled={disabled}
              >
                <FaTrash />
                <span>{actionLabel}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
