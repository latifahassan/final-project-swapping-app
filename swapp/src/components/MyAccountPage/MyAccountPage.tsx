// We need:
// 1. A way to display my listings
// 2. A new list item area
// 3. A list of my 'gets'/'claims'

import React, { useEffect } from 'react';
import UploadItem from '../UploadItem/UploadItem';
import ListDisplay from '../ListDisplay/ListDisplay';
import { TableResults } from '../App/App';
import { useUser } from '@supabase/auth-helpers-react';

type MyAccountPageProps = {
  items: TableResults[]
  filteredItems: TableResults[];
  setItems: (items:TableResults[]) => void
  setFilteredItems: (items:TableResults[]) => void
}

export default function MyAccountPage({ items, filteredItems, setFilteredItems }: MyAccountPageProps) {

  let numItems = 99;

  const user = useUser();

  useEffect( () => {
    if(user) {
      setFilteredItems(items.filter(x => x.user_id === user.id))
    } else {
      console.error("User does not have a value.")
    };
  }, [user, items, setFilteredItems] );

  return (
    <div className="accountContainer">
      <div className="uploadItem">
        <h2>Make a listing</h2>
        <form>
          <label>Item name</label>
          <input type="text" />
          <UploadItem />
          <ListDisplay 
           numItems={numItems}
           items={items}
           filteredItems={filteredItems}
           />
        </form>
    </div>
  </div>
  )
}
//items, numItems, handleGetItNowClick, spendATokenClicked, selectedItem, filteredItems