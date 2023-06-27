import React from 'react';
import { Button, CardMedia, Card, CardContent } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';

type DisplayCardProps = {
  image: string;
  title: string;
  username: string;
  id: string;
  handleGetItNowClick?: (itemId: string) => void;
  claimedItems?: string[];
};

export default function DisplayCard({
  id,
  image,
  title,
  username,
  claimedItems,
  handleGetItNowClick,
}: DisplayCardProps) {
  const itemIsClaimed = claimedItems?.includes(id);

  const handleButtonClick = () => {
    handleGetItNowClick && handleGetItNowClick(id);
  };
  console.log('Claimed Items:', claimedItems);
  console.log('Current Item ID:', id);

  
  return (
    <Card sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', borderRadius: 4, boxShadow: 2.5 }}>
      <CardMedia sx={{ height: 165, width: 172, borderRadius: 2, mt: 1.4 }} image={image} title={`image of ${title}`} />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div" sx={{ fontSize: 14, fontWeight: 'bold', maxWidth: 500, minWidth: 190, textWrap: 'wrap', mt: -2 }}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: -0.5 }}>
          {username}
        </Typography>
      </CardContent>
      <CardActions>

        {itemIsClaimed ? (
          <Typography id="claimedOption" variant="body1" sx={{ fontWeight: 'bold', color: '#018043', pb: '8px' }}>
            Claimed
          </Typography>
        ) : (
          <Button role="button" variant="contained" color="success" onClick={handleButtonClick} sx={{ mb: 2, mt: -2 }}>
            GET IT NOW
          </Button>
        )}
      </CardActions>
    </Card>
  );
}
