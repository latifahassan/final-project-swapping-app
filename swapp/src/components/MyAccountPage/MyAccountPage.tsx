// We need:
// 1. A way to display my listings
// 2. A new list item area
// 3. A list of my 'gets'/'claims'

import React from 'react'

// type Props = {}

export default function MyAccountPage() {
  return (
    <div className="accountContainer">
      <div className="uploadItem">
        <h2>Make a listing</h2>
        <form>
          <label>Item name</label>
          <input type="text" />
          <button>List it!</button>
        </form>
    </div>
  </div>
  )
}