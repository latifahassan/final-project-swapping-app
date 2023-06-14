import React from 'react'
import { Button, CardMedia, Card, CardContent } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';

type DisplayCardProps = {
  image: string
  title: string
  username: string
  id: string
  handleGetItNowClick: () => void;
  spendATokenClicked: boolean;
}

// export default function DisplayCard({id, image, title, username, handleGetItNowClick, spendATokenClicked}: DisplayCardProps) {
    
    
//   return (
//     <>
//       <Box>
//       <img src={image} alt={title}/>
//       <h3>{title}</h3>
//       <p>{username}</p>
//       {!spendATokenClicked && 
      
      
//         <Stack direction="row" spacing={2}>
//           <Button variant="contained" color="success"  onClick={handleGetItNowClick}>
//           GET IT NOW
//         </Button>

//         </Stack>      
//       } 
//              {/*
//              The GET IT NOW button should bring up a PopUp asking you to confirm your address
//              It will do this by calling a function from App.tsx that will set the state of the PopUp to true
//              If loggedIn is false, the button should take you to the sign up/log in page        
//              */}
//       {spendATokenClicked && <p id = "claimedOption">Claimed</p>} 
//       <p>The ID is {id}</p>
//     </Box>
//     </>
//   )
// }
// width: 200, marginTop: 5, marginLeft: 15, marginRight: 15, marginBottom: 5
export default function DisplayCard({id, image, title, username, handleGetItNowClick, spendATokenClicked}: DisplayCardProps) {
  return (
    <Card sx={{ maxWidth: 520, minWidth: 190, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', borderRadius: 4, boxShadow: 2.5}}>
      <CardMedia
        sx={{ height: 165, width: 172, borderRadius: 2, mt: 1.4}}
        image={image}
        title={`image of ${title}`}
        
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div" sx={{fontSize: 14, fontWeight: 'bold', maxWidth: 500, minWidth: 190, textWrap: 'wrap', mt: -2}}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{mt: -0.5}}>
          {username}
        </Typography>
      </CardContent>
      <CardActions>
      {!spendATokenClicked && 
      <Button role="button" variant="contained" color="success"  onClick={handleGetItNowClick} sx={{mb: 2, mt: -2}}>
          Get it now
        </Button>}
       {spendATokenClicked && <p id = "claimedOption">Claimed</p>} 
      </CardActions>
    </Card>
  );
}


//reduce font size of h3
//resize images inside card
//center text
//cards need some padding/margin between
//cards in rows of 2 