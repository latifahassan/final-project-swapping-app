import React from 'react'
import {useState} from "react"

//the pop up will be conditionally rendered depending on which button is clicked and whether the user is logged in and it needs to display (for the homepage) address, tokens with png and the button to confirm get
type Props = {
  isClicked: boolean,
  isLoggedIn: boolean,
  tokenNumber: number
}


export default function PopUp({}: Props) {
  // these states need to sit higher in the component tree
  const [isClicked, setIsClicked] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true)
// needs to display "confirm address", user input textbox, $`You have {png + number of tokens} tokens`, button to confirm address
// popuptitle will become prop once we are working on multiple pages
// when spend a token button is clicked it will need to update the DisplayCard to replace the button with the text Claimed - to move to parent
  return (
    <div>
      <h2 id = "popUpTitle">Confirm your address</h2>
      <input id = "userAddressInput"> </input>
      <p id = "numberOfTokens"> You have ${} tokens</p>
      <button className='greenButton'>Spend a token</button>
    </div>
  )
}