import React, { useState } from 'react';
import PopUp from '../PopUp/PopUp';
import ListDisplay from '../ListDisplay/ListDisplay';
import SearchBar from '../SearchBar/SearchBar';
import Footer from '../Footer/Footer';
import { TableResults } from '../App/App';


type HomePageProps = {
items: TableResults[]
setItems: (items:TableResults[]) => void
setFilteredItems: (items:TableResults[]) => void
filteredItems: TableResults[]
tokenCount:number
setTokenCount:(tokenCount:number)=>void
}

export default function HomePage({items, setItems, setFilteredItems, filteredItems, tokenCount, setTokenCount}: HomePageProps) {
  const [getItNowClicked, setGetItNowClicked] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string[]>([]);

  const handleGetItNowClick = (itemId: string) => {
    if (tokenCount <= 0) {
      setTokenCount(0);
      alert("You don't have any tokens left!");
    }
    else {
    setGetItNowClicked(true);
    setSelectedItem((prevSelectedItems) => [...prevSelectedItems, itemId]);
    setSpendATokenClicked(false);
    }
  };

  const [spendATokenClicked, setSpendATokenClicked] = useState(false);
  

  const handleSpendATokenClick = () => {
      setSpendATokenClicked(true);
      setTokenCount(tokenCount - 1); 
      setGetItNowClicked(false);
      console.log(spendATokenClicked);
    }
  

  // const [searchResults, setSearchResults] = useState<Listing[]>(listingsData);

  let numItems = 99;

  return (
    <div>
      <SearchBar
      items={items}
      setItems={setItems}
      setFilteredItems={setFilteredItems} />
      <ListDisplay
       numItems={numItems}
       handleGetItNowClick={handleGetItNowClick}      
       spendATokenClicked={spendATokenClicked} 
       selectedItem={selectedItem}
       items={items}
       filteredItems={filteredItems}/>
      {getItNowClicked && <PopUp
      tokenCount={tokenCount} 
      handleSpendATokenClick={handleSpendATokenClick} 
      getItNowClicked={getItNowClicked}
      setGetItNowClicked={setGetItNowClicked}/>}
      <p> Number of tokens: {tokenCount}</p>
      <Footer/>
    </div>
  
  );
}

