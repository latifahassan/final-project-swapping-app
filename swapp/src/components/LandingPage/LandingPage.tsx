import React from 'react';
import { useNavigate } from 'react-router-dom';
import ListDisplay from '../ListDisplay/ListDisplay';
import SearchBar from '../SearchBar/SearchBar';
import Footer from '../Footer/Footer';
import landingpagegif from '../../images/landingpagegif.gif';
import { Button } from '@mui/material';
import { ItemsTableResults } from '../App/App';



type LandingPageProps = {
  items: ItemsTableResults[]
  setItems: (items:ItemsTableResults[]) => void
  }

export default function LandingPage({items, setItems}: LandingPageProps) {
  const navigate = useNavigate();
  const handleGetStartedClicked = () => {
    navigate('/login');
  }


  let numItems = 99;

  return (
   
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <img src={landingpagegif} alt='gif' style={{ width: '100%', maxWidth: '500px', margin: '10px auto'}} />
      <Button role="button" variant="contained" color="success"  onClick={handleGetStartedClicked} sx={{mb: 2, mt: 2, width: '200px', height: '50px', fontSize: '1.2rem'}}>
          <b>Get Started</b>
        </Button>
      <div style={{width: '100%'}}><SearchBar items={items} setItems={setItems}/></div>
      <ListDisplay
       selectedItem={[]}
       numItems={numItems}
       handleGetItNowClick={handleGetStartedClicked}
       spendATokenClicked = {false}  
       items={items}  
        />
      <Footer/>
    </div>
  
  );
}