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
    <h2>Search Results:</h2>
    <Grid container rowSpacing={2} columnSpacing={{ xs: 10, sm: 5, md: 7 }} sx={{pl: 1.5}}>
      {slicedSearchResults.map((item) => (
        <Grid item xs = {5} key={item.id}>
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