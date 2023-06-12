// import React from 'react';
// import { useState } from 'react';
// import DisplayCard from '../DisplayCard/DisplayCard';
// import PopUp from '../PopUp/PopUp';

// export default function HomePage() {
//     const [getItNowClicked, setGetItNowClicked] = useState(false);
  
//     const handleGetItNowClick = () => {
//       setGetItNowClicked(true);
//     };

    
//   // We'll need to set this up so that when clicked in PopUp it will update the DisplayCard and eventually the token count  
//   const [spendATokenClicked, setSpendATokenClicked] = useState(false);
//   // const [isLoggedIn, setIsLoggedIn] = useState(true);

//   const handleSpendATokenClick = () => {
//     setSpendATokenClicked(true);
//     console.log(spendATokenClicked)
//   };

//   return (
//     <div>
//       <DisplayCard handleGetItNowClick={handleGetItNowClick} />
//       {getItNowClicked && <PopUp handleSpendATokenClick={handleSpendATokenClick} />}

//     </div>
//   );
// }

import React, { useState } from 'react';
import PopUp from '../PopUp/PopUp';
import ListDisplay from '../ListDisplay/ListDisplay';

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

  const displayCardProps = {
    id: 'exampleId',
    image: 'exampleImage.jpg',
    title: 'Example Title',
    username: 'exampleUser',
    handleGetItNowClick: handleGetItNowClick,
  };

  const numItems = 3;
  const [items, setItems] = useState([]);

  return (
    <div>
      <ListDisplay numItems={numItems} items={items} handleGetItNowClick={handleGetItNowClick}/>
      {getItNowClicked && <PopUp handleSpendATokenClick={handleSpendATokenClick} />}
    </div>
  );
}