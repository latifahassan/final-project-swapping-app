import React from 'react';
import DisplayCard from '../DisplayCard/DisplayCard';
import Grid from '@mui/material/Grid';

type ListDisplayProps = {
  numItems: number;
  handleGetItNowClick: () => void;
  spendATokenClicked: boolean;
  searchResults: {
    title:string,
    username: string,
    image: string,
    id: string
  }[];
};
export default function ListDisplay({ numItems, searchResults, handleGetItNowClick, spendATokenClicked }: ListDisplayProps) {
  const slicedSearchResults = searchResults.slice(0, numItems);

  return (
    <>
    {/* <Grid container rowSpacing={2} columnSpacing={{ xs: 10, sm: 5, md: 7 }} sx={{pl: 1.5}}> */}
    <Grid container spacing={2} justifyContent="flex-start" alignItems="center" sx={{ px: 2}}>
      {slicedSearchResults.map((item) => (
        <Grid item xs={12} sm={6} md={4} lg={3} xl={3} key={item.id} sx={{ display: 'flex', justifyContent: 'center' }}>
        <DisplayCard
          key={item.id}
          id={item.id}
          image={item.image}
          title={item.title}
          username={item.username}
          handleGetItNowClick={handleGetItNowClick}
          spendATokenClicked={spendATokenClicked}
        />
        </Grid>
      ))}
      </Grid>
    </>
  );
}