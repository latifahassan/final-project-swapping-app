// // this is a dummy file
// import React from 'react';
// import { useState } from 'react'
// import DisplayCard from '../DisplayCard/DisplayCard';
// import PopUp from '../PopUp/PopUp';
// // type Props = {}

// // In homepage we need to initialise the state of the buttons: 'get it now' once set to true will display the popup, 'spend a token' once set to true will replace the 'get it now' button with the text 'claimed'


// export default function HomePage({}) {
//   const ParentComponent = () => {
//     const [getItNowClicked, setGetItNowClicked] = useState(false);
  
//     const handleGetItNowClick = () => {
//       setGetItNowClicked(true)
//     }
//   }

//   const [spendATokenClicked, setSpendATokenClicked] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(true)


//   return (
//     <div>
//       <DisplayCard getItNowClicked={handleGetItNowClick}/>
//       {ParentComponent && <PopUp />}
//     </div>
//   )
// }

import React from 'react';
import { useState } from 'react';
import DisplayCard from '../DisplayCard/DisplayCard.js';
import PopUp from '../PopUp/PopUp.js';

export default function HomePage() {
  const ParentComponent = () => {
    const [getItNowClicked, setGetItNowClicked] = useState(false);
  
    const handleGetItNowClick = () => {
      setGetItNowClicked(true);
    };

    return { handleGetItNowClick };
  };

  const { handleGetItNowClick } = ParentComponent();
  const [spendATokenClicked, setSpendATokenClicked] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <div>
      <DisplayCard getItNowClicked={handleGetItNowClick} />
      {ParentComponent && <PopUp />}

    </div>
  );
}
