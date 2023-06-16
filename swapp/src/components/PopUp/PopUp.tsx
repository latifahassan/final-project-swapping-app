import React from 'react'
import { Button, CardMedia, Card, CardContent } from '@mui/material';
import { type } from 'os';

type PopUpProps = {
  handleSpendATokenClick: () => void;
  numberOfTokens: number;
}

export default function PopUp({handleSpendATokenClick, numberOfTokens}: PopUpProps) {

const youHaveOneToken = numberOfTokens === 1;

  return (
    <div>
      <h2 id = "popUpTitle">Confirm your address</h2>
      <input id = "userAddressInput"></input>
      {youHaveOneToken && <p id = "numberOfTokens"> You have 1 token</p>}
      {!youHaveOneToken && <p id = "numberOfTokens"> You have {numberOfTokens} tokens</p>}
      <button onClick={handleSpendATokenClick} className='greenButton' >Spend a token</button>
    </div>
  )
}

{/* <Button onClick={handleOpen}>Open modal</Button>
<Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={style}>
    <Typography id="modal-modal-title" variant="h6" component="h2">
      Text in a modal
    </Typography>
    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
      Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
    </Typography>
  </Box>
</Modal> */}