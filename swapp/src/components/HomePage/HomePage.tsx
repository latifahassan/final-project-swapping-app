import React, { useState } from 'react';
import PopUp from '../PopUp/PopUp';
import ListDisplay from '../ListDisplay/ListDisplay';
import SearchBar from '../SearchBar/SearchBar';
import listingsData from '../SearchBar/data.json';
import Footer from '../Footer/Footer';


type Listing = {
  title: string,
  username: string,
  image: string,
  id: string
}

export default function HomePage() {
  const [getItNowClicked, setGetItNowClicked] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const handleGetItNowClick = () => {
    setGetItNowClicked(true);
    setSelectedItem(itemId);
  };

  const [spendATokenClicked, setSpendATokenClicked] = useState(false);
  const [numberOfTokens, setNumberOfTokens] = useState(4);

  const handleSpendATokenClick = () => {
    if (numberOfTokens <= 0) {
      setNumberOfTokens(0);
      alert("You don't have any tokens left!");
    } else {
      setSpendATokenClicked(true);
      setNumberOfTokens(numberOfTokens - 1); 
      setGetItNowClicked(false);
      console.log(spendATokenClicked);
    }
  };

  const [searchResults, setSearchResults] = useState<Listing[]>(listingsData);

  let numItems = 99;

  return (
    <div>
      <SearchBar setSearchResults={setSearchResults} />
      <ListDisplay
       numItems={numItems}
       handleGetItNowClick={handleGetItNowClick}
       searchResults={searchResults}        
       spendATokenClicked={spendATokenClicked} 
       selectedItem={selectedItem}/>
       
      {getItNowClicked && <PopUp numberOfTokens={numberOfTokens} 
      handleSpendATokenClick={handleSpendATokenClick}
      getItNowClicked={getItNowClicked}/>}
      <p> Number of tokens: {numberOfTokens}</p>
      <Footer/>
    </div>
  
  );
}

