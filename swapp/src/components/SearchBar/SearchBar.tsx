import React from 'react'
import { useState } from 'react'
import './SearchBar.css'
import { TableResults } from '../App/App'


type SearchBarProps = {
  items: TableResults[];
  setItems: (FilteredData: TableResults[]) => void;
  setFilteredItems: (FilteredData: TableResults[]) => void;
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
    setFilteredItems(filteredData);
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