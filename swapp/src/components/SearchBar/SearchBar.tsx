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
  return (
    <div>SearchBar</div>
  )
}

/*
- import data ✅
- declare states ✅
  - search query - stores what user types in
  - search results - shows result 
- write searchbar function
 */