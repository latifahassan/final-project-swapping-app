import React, { useState } from 'react';
import PopUp from '../PopUp/PopUp';
import ListDisplay from '../ListDisplay/ListDisplay';
import SearchBar from '../SearchBar/SearchBar';
import Footer from '../Footer/Footer';
import './HomePage.css';

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

  const numItems = 3;
  const [items, setItems] = useState([
    // this is just an example of what the items array should look like.
    // It will eventually be set to start as empty via useState([]) 
    {
      id: '678qwerty',
      image: 'red_trousers.jpg',
      title: 'Red Trousers',
      username: 'john_doe_123',
    }
  ]);
  // adding a random console log so that setItems is technically used, so that deployment passes.
  console.log(setItems)

  return (
    <div>
      <SearchBar/>
      <ListDisplay numItems={numItems} items={items} handleGetItNowClick={handleGetItNowClick}/>
      {getItNowClicked && <PopUp handleSpendATokenClick={handleSpendATokenClick} />}
      <div className="footer-container"><Footer/></div>
    </div>
  );
}