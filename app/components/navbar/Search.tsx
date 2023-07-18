'use client'
import { useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { SaveListing } from '@/app/types';
import ListingCard from '../listings/ListingCard';

interface SearchProps {
  listings: SaveListing[];
}

const Search: React.FC<SearchProps> = ({ listings }) => {
  const [searchResults, setSearchResults] = useState<SaveListing[]>([]);
  const [searchInput, setSearchInput] = useState('');

  const handleSearch = () => {
    console.log('searchInput:', searchInput); // Check the value of searchInput
    console.log('List: ', listings)

    const filteredResults = listings.filter(listing => {
      return (
        listing.category.toLowerCase().includes(searchInput.toLowerCase()) ||
        listing.locationValue.toLowerCase().includes(searchInput.toLowerCase())
      );
    });

    console.log('filteredResults:', filteredResults); // Check the filtered results

    setSearchResults(filteredResults);
  };

  return (
    <div className="flex items-center">
      <input
        type="text"
        placeholder="Search"
        className="px-4 py-2 rounded-full border-[1px] outline-none focus:border-blue-500 transition"
        onChange={e => setSearchInput(e.target.value)}
      />
      <button
        onClick={handleSearch}
        className="ml-2 p-2 bg-white rounded-full text-black transition"
      >
        <BiSearch size={18} />
      </button>

      {/* Render the search results */}
      {searchResults.map(result => (
        <ListingCard key={result.id} data={result} />
      ))}
    </div>
  );
};

export default Search;