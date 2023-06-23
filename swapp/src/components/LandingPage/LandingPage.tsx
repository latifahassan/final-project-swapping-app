import React from 'react';
import { useNavigate } from 'react-router-dom';
import ListDisplay from '../ListDisplay/ListDisplay';
import SearchBar from '../SearchBar/SearchBar';
import Footer from '../Footer/Footer';
import landingpagegif from '../../images/landingpagegif.gif';
import landingpagegifdesktop from '../../images/landingpagegifdesktop.gif';
import { Button } from '@mui/material';
import { ItemsTableResults } from '../App/App';
import './LandingPage.css';
import useMediaQuery from '@mui/material/useMediaQuery';



type LandingPageProps = {
  items: ItemsTableResults[]
  setItems: (items:ItemsTableResults[]) => void
  setFilteredItems: (items:ItemsTableResults[]) => void
  filteredItems: ItemsTableResults[]
  }

export default function LandingPage({items, setItems, setFilteredItems, filteredItems}: LandingPageProps) {
  const navigate = useNavigate();
  const handleGetStartedClicked = () => {
    navigate('/login');
  }

  const isDesktop = useMediaQuery('(min-width: 768px)');

  const landingPageGif = isDesktop ? landingpagegifdesktop : landingpagegif;

  let numItems = 99;

  return (
   <div>
    <div className="container" style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <img src={landingPageGif} alt='gif' style={{ width: '100%', maxWidth: isDesktop ? '1200px' : '500px', margin: '10px auto'}} />
      <Button role="button" variant="contained" color="success"  onClick={handleGetStartedClicked} sx={{mb: 2, mt: 2, width: '200px', height: '50px', fontSize: '1.2rem'}}>
          <b>Get Started</b>
        </Button>
      <div style={{width: '100%'}}>
        <SearchBar
        items={items}
        setItems={setItems}
        setFilteredItems={setFilteredItems}/>
      </div>
      <ListDisplay
       selectedItem={[]}
       numItems={numItems}
       handleGetItNowClick={handleGetStartedClicked}
       spendATokenClicked = {false}  
       items={items}  
       filteredItems={filteredItems}
        /></div>
      <div className="footer"> 
      <Footer/>
      </div>
      </div>
  );
}


/*
<div className="container">
  
    search bar listdisplay
  </div>
 
    footer
  </div>
</div>

*/