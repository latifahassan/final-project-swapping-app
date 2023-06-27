// We need:
// 1. A way to display my listings
// 2. A new list item area
// 3. A list of my 'gets'/'claims'

import React, { useEffect, useState } from 'react';
import UploadItem from '../UploadItem/UploadItem';
import ListDisplay from '../ListDisplay/ListDisplay';
import { TableResults } from '../App/App';
import supabase from '../../supabaseClient'
import { User} from '@supabase/supabase-js';

type MyAccountPageProps = {
  items: TableResults[];
  filteredItems: TableResults[];
  setFilteredItems: (items:TableResults[]) => void;
  tokenCount: number;
  setTokenCount: (tokenCount: number) => void;
}

export default function MyAccountPage({ items, filteredItems, setFilteredItems, tokenCount, setTokenCount }: MyAccountPageProps) {

  let numItems = 99;

  // const user = supabase.auth.getUser();

  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect( () => {
    async function getUser() {
      const { data: { user } } = await supabase.auth.getUser()
      setCurrentUser(user);
    if(user) {
      setFilteredItems(items.filter(x => x.user_id === user?.id));
      setLoading(false);
    } else {
      console.error("User does not have a value.");
    };
    };
    getUser();
  }, [items, setFilteredItems] );

 useEffect(() => {
  console.log('see currently logged in user below...', currentUser);
  }, [currentUser]);


  if(loading) {
    return <div>loading...</div>
  };

  return (
    <div className="accountContainer">
      <div className="uploadItem">
        <h2>Make a listing</h2>
          <UploadItem 
           tokenCount={tokenCount}
           setTokenCount={setTokenCount}
           />
          <ListDisplay 
           numItems={numItems}
           items={items}
           filteredItems={filteredItems}
           setFilteredItems={setFilteredItems}
           />
    </div>
  </div>
  )
}
