import listingsData from './data.json'
import React from 'react'
import { useState } from 'react'
import './SearchBar.css'
import { ItemsTableResults } from '../App/App'

// type Listing = {
//   title: string,
//   username: string,
//   image: string,
//   id: string
// };

type SearchBarProps = {
  items: ItemsTableResults[];
  setItems: (FilteredData: ItemsTableResults[]) => void;

}

export default function SearchBar({items, setItems}: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value
    setSearchQuery(query)
    // cleanedQuery: remove any extra spaces and make the string lowercase
    // "     rEd      dREsS     "
    // "red dress"
    const cleanedQuery = query.trim().replace(/\s+/g, " ").toLowerCase();
    const filteredData = items.filter((Items:ItemsTableResults[])=> items.title.toLowerCase().includes(cleanedQuery));
    setItems(filteredData)
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