import React, { useState } from 'react';
import PopUp from '../PopUp/PopUp';
import ListDisplay from '../ListDisplay/ListDisplay';
import SearchBar from '../SearchBar/SearchBar';
<<<<<<< HEAD
import Footer from '../Footer/Footer';
import './HomePage.css';
=======
import listingsData from '../SearchBar/data.json';

type Listing = {
  title: string,
  username: string,
  image: string,
  id: string
}
>>>>>>> 2d69a9aabac0984d9eb673bf9f2829fae087d45a

export default function HomePage() {
  const [getItNowClicked, setGetItNowClicked] = useState(false);

  const handleGetItNowClick = () => {
    setGetItNowClicked(true);
  };

  const [spendATokenClicked, setSpendATokenClicked] = useState(false);
  const [numberOfTokens, setNumberOfTokens] = useState(4);

  const handleSpendATokenClick = () => {
    setSpendATokenClicked(true);
    setNumberOfTokens(numberOfTokens - 1); 
    setGetItNowClicked(false);
    console.log(spendATokenClicked);
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
       spendATokenClicked={spendATokenClicked} />
      {getItNowClicked && <PopUp handleSpendATokenClick={handleSpendATokenClick} />}
<<<<<<< HEAD
      <div className="footer-container"><Footer/></div>
=======
      <p> Number of tokens: {numberOfTokens}</p>
>>>>>>> 2d69a9aabac0984d9eb673bf9f2829fae087d45a
    </div>
  
  );
}

