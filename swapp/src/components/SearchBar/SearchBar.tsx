// this is a dummy file
import listingsData from './data.json'
import React from 'react'
import { useState } from 'react'

type Listing = {
  title:string,
  username: string,
  image: string,
  id: string
}

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Listing[]>([]);
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
    <div>
      <input
        type="text"
        placeholder="Search"
        value={searchQuery}
        onChange={handleInputChange}
      />

{searchResults.length > 0 && (
  <div>
    <h3>Search Results:</h3>
    <ul>
      {searchResults.map((result, index) => (
        <li key={index}>
          <img src={result.image} alt={result.title} />
          <div>{result.title}</div>
          <div>{result.username}</div>
        </li>
      ))}
    </ul>
        </div>
      )}
    </div>
  );
}





/*
- import data ✅
- declare states ✅
  - search query - stores what user types in
  - search results - shows result 
- write searchbar function
 */