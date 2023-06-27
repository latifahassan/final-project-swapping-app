import React, { useState } from 'react';
import PopUp from '../PopUp/PopUp';
import ListDisplay from '../ListDisplay/ListDisplay';
import SearchBar from '../SearchBar/SearchBar';
import Footer from '../Footer/Footer';
import { TableResults } from '../App/App';
import supabase from '../../supabaseClient';

type HomePageProps = {
  items: TableResults[];
  setItems: (items: TableResults[]) => void;
  setFilteredItems: (items: TableResults[]) => void;
  filteredItems: TableResults[];
  tokenCount: number;
  setTokenCount: (tokenCount: number) => void;
  claimedItems: string[];
  setClaimedItems: (claimedItems: string[]) => void;
};

export default function HomePage({
  items,
  setItems,
  setFilteredItems,
  filteredItems,
  tokenCount,
  setTokenCount,
  claimedItems,
  setClaimedItems,
}: HomePageProps) {
  const [getItNowClicked, setGetItNowClicked] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string[]>([]);
  const [spendATokenClicked, setSpendATokenClicked] = useState(false);

  const handleGetItNowClick = (itemId: string) => {
    if (tokenCount <= 0) {
      setTokenCount(0);
      alert("You don't have any tokens left!");
    } else {
      setGetItNowClicked(true);
      if (!claimedItems.includes(itemId)) {
        setSelectedItem((prevSelectedItems) => [...prevSelectedItems, itemId]);
      }
      setSpendATokenClicked(false);
    }
  };

  const handleSpendATokenClick = async () => {
    if (tokenCount === null) {
      return;
    }
  
    setSpendATokenClicked(true);
    setTokenCount(tokenCount - 1);
    setGetItNowClicked(false);
  
    try {
      const { data: { user } } = await supabase.auth.getUser();
  
      if (!user) {
        console.log('User not found');
        return;
      }
  
      const { error: updateError } = await supabase
        .from('users')
        .update({ token_count: tokenCount - 1 })
        .eq('user_id', user.id);
  
      if (updateError) {
        console.error('Error updating user token count:', updateError);
        return;
      }
  
      for (const itemId of selectedItem) {
        const { error: insertError } = await supabase
          .from('claims')
          .insert([{ item_id: itemId, user_id: user.id, claimed: true }]);
  
          if (insertError) {
            console.error('Error inserting claim:', insertError);
          } else {
            console.log('Claim inserted successfully.');
            setClaimedItems([...claimedItems, itemId]);
          }
          
      }
    } catch (error) {
      console.error('Error updating user token count:', error);
    }
  };
console.log(claimedItems)

  let numItems = 99;

  return (
    <div>
      <SearchBar items={items} setItems={setItems} setFilteredItems={setFilteredItems} />
      <ListDisplay

       numItems={numItems}
       handleGetItNowClick={handleGetItNowClick}      
       spendATokenClicked={spendATokenClicked} 
       selectedItem={selectedItem}
       items={items}
       filteredItems={filteredItems}
       setFilteredItems={setFilteredItems}
       claimedItems={claimedItems}
       />
      {getItNowClicked && <PopUp
      tokenCount={tokenCount} 
      handleSpendATokenClick={handleSpendATokenClick} 
      getItNowClicked={getItNowClicked}
      setGetItNowClicked={setGetItNowClicked}/>}
      <Footer />
    </div>
  );
} 