import React, { useState } from 'react';
import PopUp from '../PopUp/PopUp';
import ListDisplay from '../ListDisplay/ListDisplay';
import SearchBar from '../SearchBar/SearchBar';
import Footer from '../Footer/Footer';
import { ItemsTableResults } from '../App/App';


type HomePageProps = {
items: ItemsTableResults[]
setItems: (items:ItemsTableResults[]) => void
}

export default function HomePage({items, setItems}: HomePageProps) {
  const [getItNowClicked, setGetItNowClicked] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string[]>([]);

  const handleGetItNowClick = (itemId: string) => {
    setGetItNowClicked(true);
    setSelectedItem((prevSelectedItems) => [...prevSelectedItems, itemId]);
    setSpendATokenClicked(false);
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

  // const [searchResults, setSearchResults] = useState<Listing[]>(listingsData);

  let numItems = 99;

  return (
    <div>
      <SearchBar items={items} setItems={setItems} />
      <ListDisplay
       numItems={numItems}
       handleGetItNowClick={handleGetItNowClick}      
       spendATokenClicked={spendATokenClicked} 
       selectedItem={selectedItem}
       items={items}/>
      {getItNowClicked && <PopUp
      numberOfTokens={numberOfTokens} 
      handleSpendATokenClick={handleSpendATokenClick} 
      getItNowClicked={getItNowClicked}
      setGetItNowClicked={setGetItNowClicked}/>}
      <p> Number of tokens: {numberOfTokens}</p>
      <Footer/>
    </div>
  
  );
}

