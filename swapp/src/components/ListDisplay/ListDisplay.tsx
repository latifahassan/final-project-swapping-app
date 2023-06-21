import React from 'react';
import DisplayCard from '../DisplayCard/DisplayCard';
import Grid from '@mui/material/Grid';
import { ItemsTableResults } from '../App/App';

type ListDisplayProps = {
  items: ItemsTableResults[]
  numItems: number;
  handleGetItNowClick: (itemId: string) => void;
  spendATokenClicked: boolean;
  selectedItem: string[]; 
};
export default function ListDisplay({ items, numItems, handleGetItNowClick, spendATokenClicked, selectedItem }: ListDisplayProps) {
  const slicedItems = items.slice(0, numItems);

  return (
    <>
    {/* <Grid container rowSpacing={2} columnSpacing={{ xs: 10, sm: 5, md: 7 }} sx={{pl: 1.5}}> */}
    <Grid container spacing={2} justifyContent="flex-start" alignItems="center" sx={{ px: 2}}>
      {slicedItems.map((item) => (
        <Grid item xs={12} sm={6} md={4} lg={3} xl={3} key={item.item_id} sx={{ display: 'flex', justifyContent: 'center' }}>
        <DisplayCard
          key={item.item_id}
          id={item.item_id}
          image={item.image}
          title={item.title}
          username={item.username}
          handleGetItNowClick={() => handleGetItNowClick(item.item_id)}
          spendATokenClicked={spendATokenClicked}
          selectedItem={selectedItem}
        />
        </Grid>
      ))}
      </Grid>
    </>
  );
}