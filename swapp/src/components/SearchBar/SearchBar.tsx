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
    setSearchQuery(event.target.value)
  }
  return (
    <div>
  <input type="text" 
  placeholder='Search'
  value={searchQuery}
  onChange={handleInputChange}
  />
    </div>
  )
}

/*
- import data ✅
- declare states ✅
  - search query - stores what user types in
  - search results - shows result 
- write searchbar function
 */