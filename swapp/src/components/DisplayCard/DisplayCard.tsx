import React from "react";
import { Button, CardMedia, Card, CardContent } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";

type DisplayCardProps = {
  image: string;
  title: string;
  username: string;
  id: string;
  spendATokenClicked?: boolean;
  handleGetItNowClick?: (itemId: string) => void;
  selectedItem?: string[];
};

export default function DisplayCard({
  id,
  image,
  title,
  username,
  handleGetItNowClick,
  spendATokenClicked,
  selectedItem = [],
}: DisplayCardProps) {
  // aobve, we had to write selectedItem = [] because we are using the selectedItem prop in the ListDisplay component, and we are passing it down to the DisplayCard component. However, we are not passing it down every time, so we have to set a default value for it. We set it to an empty array, so that if we don't pass it down, it will be an empty array, and we can still use it in the DisplayCard component.
  const itemIsSelected = selectedItem.includes(id);

  const handleButtonClick = () => {
    // we have to use short circuiting to check if the function exists before calling it. We have to do this since in the props it is optional, thanks to the '?'.
    handleGetItNowClick && handleGetItNowClick(id);
  };

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
        {(!itemIsSelected || !spendATokenClicked) && (
          <Button
            role="button"
            variant="contained"
            color="success"
            onClick={handleButtonClick}
            sx={{ mb: 2, mt: -2 }}
          >
            GET IT NOW
          </Button>
        )}
        {spendATokenClicked && itemIsSelected && (
          <Typography
            id="claimedOption"
            variant="body1"
            sx={{ fontWeight: "bold", color: "#018043", pb: "8px" }}
          >
            Claimed
          </Typography>
        )}
      </CardActions>
    </Card>
  );
}
