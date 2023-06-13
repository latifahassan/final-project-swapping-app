import React from 'react'

export default function PopUp(props: | { handleSpendATokenClick: () => void; }){
  // this state need to sit higher in the component tree
  // const [isLoggedIn, setIsLoggedIn] = useState(true)
// needs to display "confirm address", user input textbox, $`You have {png + number of tokens} tokens`, button to confirm address
// popuptitle will become prop once we are working on multiple pages
// when spend a token button is clicked it will need to update the DisplayCard to replace the button with the text Claimed - to move to parent

  const handleClick = () => {
    props.handleSpendATokenClick();
  };

  return (
    <div>
      <h2 id = "popUpTitle">Confirm your address</h2>
      <input id = "userAddressInput"></input>
      {/* <p id = "numberOfTokens"> You have ${} tokens</p> */}
      <button onClick={handleClick} className='greenButton' >Spend a token</button>
    </div>
  )
}