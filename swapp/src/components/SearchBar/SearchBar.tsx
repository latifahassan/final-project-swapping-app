import listingsData from './data.json'
import React from 'react'
import { useState } from 'react'
import './SearchBar.css'

type Listing = {
  title: string,
  username: string,
  image: string,
  id: string
};

type SearchBarProps = {
  setSearchResults: (FilteredData: Listing[]) => void;
}

export default function SearchBar({setSearchResults}: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value
    setSearchQuery(query)
    // cleanedQuery: remove any extra spaces and make the string lowercase
    // "     rEd      dREsS     "
    // "red dress"
    const cleanedQuery = query.trim().replace(/\s+/g, " ").toLowerCase();
    const filteredData = listingsData.filter((listing:Listing)=> listing.title.toLowerCase().includes(cleanedQuery));
    setSearchResults(filteredData)
  }
  return (
    <div id="searchIcon">
      <input
        className="searchBar123"
        type="text"
        placeholder="Search"
        value={searchQuery}
        onChange={handleInputChange}
      />
    </div>
  );
}