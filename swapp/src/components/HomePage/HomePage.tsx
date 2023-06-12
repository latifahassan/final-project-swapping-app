import React from 'react';
import { useState } from 'react';
import DisplayCard from '../DisplayCard/DisplayCard';
import PopUp from '../PopUp/PopUp';

export default function HomePage() {
    const [getItNowClicked, setGetItNowClicked] = useState(false);
  
    const handleGetItNowClick = () => {
      setGetItNowClicked(true);
    };

    
  // We'll need to set this up so that when clicked in PopUp it will update the DisplayCard and eventually the token count  
  const [spendATokenClicked, setSpendATokenClicked] = useState(false);
  // const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handleSpendATokenClick = () => {
    setSpendATokenClicked(true);
    console.log(spendATokenClicked)
  };

  return (
    <div>
      <DisplayCard handleGetItNowClick={handleGetItNowClick} />
      {getItNowClicked && <PopUp handleSpendATokenClick={handleSpendATokenClick} />}

    </div>
  );
}
