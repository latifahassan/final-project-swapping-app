import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ListDisplay from '../ListDisplay/ListDisplay';
import SearchBar from '../SearchBar/SearchBar';
import listingsData from '../SearchBar/data.json';
import Footer from '../Footer/Footer';
import landingpagegif from '../../images/landingpagegif.gif';
import { Button } from '@mui/material';
import './LandingPage.css';

type Listing = {
  title: string,
  username: string,
  image: string,
  id: string
}

export default function LandingPage() {
  const navigate = useNavigate();
  const handleGetStartedClicked = () => {
    navigate('/login');
  }

  const [searchResults, setSearchResults] = useState<Listing[]>(listingsData);

  let numItems = 99;

// check on phone, possibly make gif smaller
// make search bar longer to match homepage

  return (
   
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <img src={landingpagegif} alt='gif' style={{ width: '100%', maxWidth: '500px', margin: '10px auto'}} />
      <Button role="button" variant="contained" color="success"  onClick={handleGetStartedClicked} sx={{mb: 2, mt: 2, width: '200px', height: '50px', fontSize: '1.2rem'}}>
          <b>Get Started</b>
        </Button>
      <div style={{width: '100%'}}><SearchBar setSearchResults={setSearchResults}/></div>
      <ListDisplay
       numItems={numItems}
       handleGetItNowClick={handleGetStartedClicked}
       searchResults={searchResults}
       spendATokenClicked = {false}        
        />
      <Footer/>
    </div>
  
  );
}
