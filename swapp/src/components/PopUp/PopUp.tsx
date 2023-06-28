import React from 'react';
import Modal from '@mui/material/Modal';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { TextField, Button } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useLocation } from 'react-router-dom';

type PopUpProps = {
  handleSpendATokenClick?: () => void;
  getItNowClicked?: boolean;
  setGetItNowClicked?: (getItNowClicked: boolean) => void;
  tokenCount?: number;
  claimantUsername?: string;
  claimantAddress?: string;
};

export default function PopUp({
  handleSpendATokenClick,
  tokenCount,
  getItNowClicked,
  setGetItNowClicked,
  claimantAddress,
  claimantUsername,
}: PopUpProps) {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    if (getItNowClicked) {
      setOpen(true);
    }
  }, [getItNowClicked]);

  const handleCloseModal = () => {
    setOpen(false);
    setGetItNowClicked?.(false);
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
            {location.pathname === '/home'
              ? 'Confirm your address'
              : 'This item has been claimed'}
          </Typography>
          {location.pathname === '/home' ? (
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
              <Button
                role="button"
                variant="contained"
                style={{ backgroundColor: '#018043' }}
              >
                I've shipped this item
              </Button>
              <Button
                role="button"
                variant="contained"
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
