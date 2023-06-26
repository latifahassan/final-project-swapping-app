// We need:
// 1. A way to display my listings
// 2. A new list item area
// 3. A list of my 'gets'/'claims'

import React from 'react'
import UploadItem from '../UploadItem/UploadItem'
import ListDisplay from '../ListDisplay/ListDisplay'
import { TableResults } from '../App/App'

type MyAccountPageProps = {
  items: TableResults[]
  filteredItems: TableResults[];
  setItems: (items:TableResults[]) => void
  setFilteredItems: (items:TableResults[]) => void
}

export default function MyAccountPage({ items, filteredItems, setFilteredItems }: MyAccountPageProps) {

  let numItems = 99;

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