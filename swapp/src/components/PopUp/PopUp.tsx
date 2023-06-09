import React from 'react';
import Modal from '@mui/material/Modal';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { TextField, Button } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

type PopUpProps = {
  handleSpendATokenClick?: () => void;
  getItNowClicked?: boolean;
  setGetItNowClicked?: (getItNowClicked: boolean) => void;
  tokenCount?: number;
  claimantUsername?: string;
  claimantAddress?: string;
  claimantEmail?: string;
  viewClicked?: boolean;
  setViewClicked?: (viewClicked: boolean) => void;
  viewType: "homepage" | "myaccount"
};

export default function PopUp({
  handleSpendATokenClick,
  tokenCount,
  viewType,
  getItNowClicked,
  setGetItNowClicked,
  claimantAddress,
  claimantUsername,
  claimantEmail,
  setViewClicked,
  viewClicked,
}: PopUpProps) {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    if (getItNowClicked || viewClicked) {
      setOpen(true);
    }
  }, [getItNowClicked, viewClicked]);

  const handleCloseModal = () => {
    setOpen(false);
    setGetItNowClicked?.(false);
    setViewClicked?.(false);
  };

  const youHaveOneToken = tokenCount === 1;

  return (
    
    <div>
      <Modal
        disableEnforceFocus
        open={open}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            backgroundColor: 'white',
            width: '300px',
            margin: '0 auto',
            textAlign: 'center',
            mt: isMobile ? '40%' : '15%',
            pt: '40px',
            pb: '40px',
            pl: isMobile ? '10px' : '40px',
            pr: isMobile ? '10px' : '40px',
            borderRadius: '26px',
          }}
        >
          <Typography
            id="modal-modal-title"
            variant="h5"
            component="h2"
            sx={{ fontWeight: 'bold', pb: '15px' }}
          >
            {viewType === 'homepage'
              ? 'Confirm your address'
              : 'This item has been claimed'}
          </Typography>
          {viewType === "homepage" ? (
            <>
              <TextField
                id="outlined-basic"
                label="Address"
                variant="outlined"
                sx={{ backgroundColor: '#E3E2E2', width: '260px', margin: '0 auto' }}
              />
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {youHaveOneToken && <p id="numberOfTokens"> You have 1 token</p>}
                {!youHaveOneToken && <p id="numberOfTokens"> You have {tokenCount} tokens</p>}
              </Typography>
              <Button
                role="button"
                variant="contained"
                style={{ backgroundColor: '#018043' }}
                onClick={handleSpendATokenClick}
                className="greenButton"
              >
                Spend a token
              </Button>
            </>
          ) : (
            <>
              <TextField
                id="outlined-basic"
                label="Username"
                variant="outlined"
                value={claimantUsername || ''}
                disabled
                sx={{ backgroundColor: '#E3E2E2', width: '260px', margin: '0 auto' }}
              />
              <TextField
                id="outlined-basic"
                label="Address"
                variant="outlined"
                value={claimantAddress || ''}
                disabled
                sx={{ backgroundColor: '#E3E2E2', width: '260px', margin: '0 auto', mt: '10px' }}
              />
              <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                value={claimantEmail || ''}
                disabled
                sx={{ backgroundColor: '#E3E2E2', width: '260px', margin: '0 auto', mt: '10px' }}
              />
              {/* <Button
                role="button"
                variant="contained"
                style={{ backgroundColor: '#018043' }}
              >
                I've shipped this item
              </Button> */}
              <Button
                role="button"
                variant="contained"
                onClick={handleCloseModal}
                style={{ backgroundColor: '#FF5C5C' }}
              >
                Go back
              </Button>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
}
