// this is a dummy file
import listingsData from './data.json'
import React from 'react'
import { useState } from 'react'

type Listing = {
  title:string,
  username: string,
  image: string
}

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Listing[]>([]);
  function handleSearch(){
    const filteredData = listingsData.filter((listing:Listing)=> listing.title.toLowerCase().includes(searchQuery.toLowerCase()));
    setSearchResults(filteredData)
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase()
    setSearchQuery(query)
    const filteredData = listingsData.filter((listing:Listing)=> listing.title.toLowerCase().includes(query));
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