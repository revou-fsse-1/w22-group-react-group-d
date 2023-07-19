import Image from "next/image";

import Heading from "../Heading";
import HeartButton from "../HeartButton";

interface ListingHeadProps {
  title: string;
  locationValue: string;
  imageSrc: string;
  id: string;
}

const ListingHead: React.FC<ListingHeadProps> = ({ title, imageSrc, id }) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={title} />
      </div>
      <div className="w-full h-[60vh] overflow-hidden rounded-xl relative">
        <Image
          src={imageSrc}
          fill
          className="object-cover w-full"
          alt="Image"
        />
        <div className="absolute top-5 right-5">
          <HeartButton listingId={id} />
        </div>
      </div>
    </>
  );
};

export default ListingHead;
