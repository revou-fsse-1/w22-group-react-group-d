"use client";
import { SaveListing, SaveUser } from "@/app/types";
import Categories from "./Categories";
import Container from "../Container";
import Logo from "./Logo";
import UserMenu from "./UserMenu";
import { useEffect, useState } from "react";

interface NavbarProps {
  currentUser?: SaveUser | null;
}

const Navbar: React.FC<NavbarProps> = ({
  currentUser,
}) => {
  const [listings, setListings] = useState<SaveListing[]>([]);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await fetch("/api/listings");
        const data = await response.json();
        setListings(data); // Set the fetched data to the listings state
      } catch (error) {
        console.error('Error fetching listings:', error);
      }
    };

    fetchListings();
  }, []);

  return ( 
    <div className="fixed w-full bg-[#1B4571] z-10 shadow-sm">
      <div
        className="
          py-4 
          border-b-[1px]
        "
      >
      <Container>
        <div 
          className="
            flex 
            flex-row 
            items-center 
            justify-between
            gap-3
            md:gap-0
          "
        >
          <Logo />
          <UserMenu currentUser={currentUser} />
        </div>
      </Container>
    </div>
    <Categories />
  </div>
  );
};

export default Navbar;
