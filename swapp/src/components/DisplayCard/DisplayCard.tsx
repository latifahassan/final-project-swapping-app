import React from "react";
import { Button, CardMedia, Card, CardContent } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import { useLocation } from "react-router-dom";
import supabase from '../../supabaseClient'
import { TableResults } from '../App/App';

type DisplayCardProps = {
  image: string;
  title: string;
  username: string;
  id: string;
  spendATokenClicked?: boolean;
  handleGetItNowClick?: (itemId: string) => void;
  selectedItem?: string[];
  filteredItems?: TableResults[];
  setFilteredItems?: (items: TableResults[]) => void;
  claimedItems?: string[];
};

export default function DisplayCard({
  id,
  image,
  title,
  username,
  claimedItems,
  handleGetItNowClick,
  spendATokenClicked,
  selectedItem = [],
  filteredItems = [],
  setFilteredItems = () => {},
}: DisplayCardProps) {
  // aobve, we had to write selectedItem = [] because we are using the selectedItem prop in the ListDisplay component, and we are passing it down to the DisplayCard component. However, we are not passing it down every time, so we have to set a default value for it. We set it to an empty array, so that if we don't pass it down, it will be an empty array, and we can still use it in the DisplayCard component.
  const itemIsSelected = selectedItem.includes(id);
  const location = useLocation();
  const isMyAccountPage = location.pathname === "/myaccount";
  const itemIsClaimed = claimedItems?.includes(id);

  const handleButtonClick = () => {
    handleGetItNowClick && handleGetItNowClick(id);
  };

  const handleUnlistButtonClick = async () => {
    console.log("UNLIST button clicked, and handleUnlistButtonClick function called. The item_id is: ", id);
    const { data: userData, error: userError } = await supabase.auth.getUser();
    const currentUserID = userData?.user?.id;
    console.log("currentUserID is: ", currentUserID);

    if(userError) {
      console.error(userError);
    };
  
    if (currentUserID) {
      // Fetch the item to be deleted
      const { data: itemData, error: itemError } = await supabase
        .from("items")
        .select("user_id")
        .eq("item_id", id)
        .single();
  
      if (itemError) {
        console.error(itemError);
      }
      
      const itemUserID = itemData?.user_id;
  
      if (currentUserID === itemUserID) {
        // Current user has permission to delete the item
        await supabase.from("items").delete().eq("item_id", id);
        // now refresh the state of the filteredItems so that the deleted item is no longer displayed
        setFilteredItems(filteredItems.filter(x => x.item_id !== id));
      }   else {
        // Current user doesn't have permission to delete the item
        console.log("Permission denied. The current user is not the owner of the item.");
      }
    }
  };

  console.log('Claimed Items:', claimedItems);
  console.log('Current Item ID:', id);


  
  return (
    <Card
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        borderRadius: 4,
        boxShadow: 2.5,
      }}
    >
      <CardMedia
        sx={{ height: 165, width: 172, borderRadius: 2, mt: 1.4 }}
        image={image}
        title={`image of ${title}`}
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={{
            fontSize: 14,
            fontWeight: "bold",
            maxWidth: 500,
            minWidth: 190,
            textWrap: "wrap",
            mt: -2,
          }}
        >
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: -0.5 }}>
          {username}
        </Typography>
      </CardContent>
      <CardActions>
        
        {(!isMyAccountPage && itemIsClaimed) && (
          <Typography id="claimedOption" variant="body1" sx={{ fontWeight: 'bold', color: '#018043', pb: '8px' }}>
            Claimed
          </Typography>
        )}

        {(!isMyAccountPage && !itemIsClaimed) && (
          <Button role="button" variant="contained" color="success" onClick={handleButtonClick} sx={{ mb: 2, mt: -2 }}>
            GET IT NOW
          </Button>
         )}

        {isMyAccountPage && !itemIsSelected && (
          <Button
            role="button"
            variant="contained"
            color="success"
            onClick={handleButtonClick}
            sx={{ mb: 2, mt: -2 }}
          >
            VIEW
          </Button>
        )}

        {isMyAccountPage && !(spendATokenClicked && itemIsSelected) && (
          <Button
            role="button"
            variant="contained"
            color="error"
            onClick={handleUnlistButtonClick}
            sx={{ mb: 2, mt: -2 }}
          >
            UNLIST
          </Button>
        )}
      </CardActions>
    </Card>
  );
}
  