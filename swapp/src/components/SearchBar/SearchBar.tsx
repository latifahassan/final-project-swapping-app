import React from 'react'
import { useState } from 'react'
import './SearchBar.css'
import { ItemsTableResults } from '../App/App'


type SearchBarProps = {
  items: ItemsTableResults[];
  setItems: (FilteredData: ItemsTableResults[]) => void;
  setFilteredItems: (FilteredData: ItemsTableResults[]) => void;
}

export default function SearchBar({items, setItems, setFilteredItems}: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value
    setSearchQuery(query)
    // cleanedQuery: remove any extra spaces and make the string lowercase
    // "     rEd      dREsS     "
    // "red dress"
    const cleanedQuery = query.trim().replace(/\s+/g, " ").toLowerCase();
    let copyOfItems = [...items];
    const filteredData = copyOfItems.filter((item)=> item.title.toLowerCase().includes(cleanedQuery));
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