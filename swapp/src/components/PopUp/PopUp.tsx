import React from 'react'
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

type PopUpProps = {
  handleSpendATokenClick: () => void;
  numberOfTokens: number;
  getItNowClicked: boolean;
  setGetItNowClicked: (getItNowClicked: boolean) => void;
}

export default function PopUp({handleSpendATokenClick, numberOfTokens, getItNowClicked, setGetItNowClicked}: PopUpProps) {

const [open, setOpen] = useState(false);
const theme = useTheme();

const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

useEffect(() => {
  if (getItNowClicked) {
    setOpen(true);
  }
}, [getItNowClicked]);
const handleCloseModal = () => {
  setOpen(false);
  setGetItNowClicked(false);
};

const youHaveOneToken = numberOfTokens === 1;

  return (
    <div>
      <Modal
        open={open}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">

        <Box sx={{ backgroundColor: 'white', width: '300px', margin: '0 auto', textAlign: 'center', mt: isMobile ? "40%" : "15%", p: '40px', borderRadius: '26px'}}>
        <Typography id="modal-modal-title" variant="h5" component="h2" sx={{fontWeight: 'bold', pb: '15px'}}>
          Confirm your address
        </Typography>
        <TextField id="outlined-basic" label="Address" variant="outlined" sx={{backgroundColor: '#E3E2E2', width: '260px', margin: '0 auto'}} />
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {youHaveOneToken && <p id = "numberOfTokens"> You have 1 token</p>}
          {!youHaveOneToken && <p id = "numberOfTokens"> You have {numberOfTokens} tokens</p>}
        </Typography>
        <Button role="button" variant="contained" color="success" onClick={handleSpendATokenClick} className='greenButton' >Spend a token</Button>
      </Box>
      </Modal>
    </div>
  )
}