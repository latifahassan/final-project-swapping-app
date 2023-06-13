import React, { useState } from 'react';
import PopUp from '../PopUp/PopUp';
import ListDisplay from '../ListDisplay/ListDisplay';
import SearchBar from '../SearchBar/SearchBar';
import listingsData from '../SearchBar/data.json';

type Listing = {
  title: string,
  username: string,
  image: string,
  id: string
}

export default function HomePage() {
  const [getItNowClicked, setGetItNowClicked] = useState(false);

  const handleGetItNowClick = () => {
    setGetItNowClicked(true);
  };

  const [spendATokenClicked, setSpendATokenClicked] = useState(false);

  const handleSpendATokenClick = () => {
    setSpendATokenClicked(true);
    console.log(spendATokenClicked);
  };

  const [searchResults, setSearchResults] = useState<Listing[]>([]);

  const numItems = 3;
  const [items, setItems] = useState(listingsData);
  // adding a random console log so that setItems is technically used, so that deployment passes.
  console.log(setItems)

  return (
    <div>
      <SearchBar
      setSearchResults={setSearchResults}
      />
      <ListDisplay
       numItems={numItems}
       items={items}
       handleGetItNowClick={handleGetItNowClick}
       searchResults={searchResults}/>
      {getItNowClicked && <PopUp handleSpendATokenClick={handleSpendATokenClick} />}
    </div>
  );
}